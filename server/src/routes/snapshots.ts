import express from "express";
import { QueryTypes } from "sequelize";
import { requireJwt } from "../auth";
import db from "../models";
import { UserAttributes as User } from "../models/users";

const router = express.Router();

/*
 * Inputs: None
 * Outputs: Provides all data related to the most recently submitted snapshot (just one),
 * including all its subtables (accounts, holdings) as json
 *
 * Snapshot = {
 *    Accounts: [{
 *          Holdings: [{}]
 *    }]
 * }
 * returns null if no snapshots exist
 */
router.get("/latest", requireJwt, async (req, res) => {
  const { id } = req.user as User;
  try {
    const snapshot = await db.Snapshots.findOne({
      where: { userId: id },
      include: {
        model: db.Accounts,
        include: {
          model: db.Holdings,
        },
      },
      order: [["specifiedDate", "DESC"]],
      limit: 1,
    });
    res.json(snapshot);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error - could not process request." });
  }
});

/*
 * Inputs: Number of years prior to current date
 * Outputs: Outputs a list of all the snapshots (multiple) that fall within the date range of now
 * minus the number of input years as json.  Does not include accounts/holdings info.
 *
 * Snapshots = [ {}, {}, {} ] where {} = snapshot
 * returns null if no snapshots exist
 */
router.get("/range/:years", requireJwt, async (req, res) => {
  const { id } = req.user as User;
  const { years } = req.params;
  let startDate = new Date();

  startDate.setMonth(new Date().getMonth() - parseInt(years) * 12);

  try {
    const snapshots = await db.sequelize.query(
      `select
        "Snapshots"."id",
        "Snapshots"."title",
        "Snapshots"."benchmark",
        "Snapshots"."notes",
        "Snapshots"."specifiedDate",
        SUM("combined"."total") as "total"
      from
        "Snapshots"
      inner join
      (
        select
          "Accounts"."id",
          "Accounts"."snapshotId",
          SUM("Holdings"."total") as "total"
        from
          "Accounts"
        inner join "Holdings" on
          "Accounts"."id" = "Holdings"."accountId"
        group by
          "Accounts"."id",
          "Accounts"."snapshotId"
      ) as "combined" on
        "Snapshots"."id" = "combined"."snapshotId"
      where
        "Snapshots"."userId" = :id and
        "Snapshots"."specifiedDate" >= :date
      group by
        "Snapshots"."id",
        "Snapshots"."title",
        "Snapshots"."benchmark",
        "Snapshots"."notes",
        "Snapshots"."specifiedDate"
      order by
        "Snapshots"."specifiedDate" desc`,
      {
        replacements: { id, date: startDate.toISOString() },
        type: QueryTypes.SELECT,
      }
    );

    res.json(snapshots);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error - could not process request." });
  }
});

export default router;
