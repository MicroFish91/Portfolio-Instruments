import express from "express";
import { QueryTypes } from "sequelize";
import { requireJwt } from "../auth";
import db from "../models";
import { UserAttributes as User } from "../models/users";
import {
  validateAccount,
  validateHolding,
  validateSnapshot,
} from "../models/validation";
import { IncomingSnapshot } from "../models/validation/types";

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

// Post a snapshot to database
router.post("/", requireJwt, async (req, res) => {
  const { id } = req.user as User;
  const clientData = req.body.snapshot as IncomingSnapshot;

  const postSnapshot = {
    title: clientData.title,
    benchmark: clientData.benchmark,
    notes: clientData.notes,
    specifiedDate: new Date(clientData.specifiedDate),
    userId: id,
  };

  let snapshotId: number = 0;
  let accountIds: number[] = [];
  let holdingIds: number[] = [];

  try {
    let { error } = validateSnapshot(postSnapshot);
    if (error) throw new TypeError(error.message);

    const snapshot = await db.Snapshots.create(postSnapshot);
    snapshotId = snapshot.dataValues.id;

    const accountData = clientData.accounts;

    for (
      let accountIndex = 0;
      accountIndex < accountData.length;
      accountIndex++
    ) {
      const postAccount = {
        location: accountData[accountIndex].location,
        type: accountData[accountIndex].type,
        snapshotId,
      };

      let { error } = validateAccount(postAccount);
      if (error) throw new TypeError(error.message);

      const account = await db.Accounts.create(postAccount);
      accountIds.push(account.dataValues.id);

      const holdingData = accountData[accountIndex].holdings;

      for (
        let holdingIndex = 0;
        holdingIndex < holdingData.length;
        holdingIndex++
      ) {
        const postHolding = {
          title: holdingData[holdingIndex].title,
          ticker: holdingData[holdingIndex].ticker,
          category: holdingData[holdingIndex].category,
          total: holdingData[holdingIndex].total,
          expenseRatio: holdingData[holdingIndex].expenseRatio,
          accountId: accountIds[accountIds.length - 1],
        };

        let { error } = validateHolding(postHolding);
        if (error) throw new TypeError(error.message);

        const holding = await db.Holdings.create(postHolding);
        holdingIds.push(holding.dataValues.id);
      }
    }

    res.json({ message: "Success." });
  } catch (error) {
    // Remove incomplete/extraneous data from the database
    try {
      if (holdingIds.length) {
        for (let index = 0; index < holdingIds.length; index++) {
          await db.Holdings.destroy({ where: { id: holdingIds[index] } });
        }
      }

      if (accountIds.length) {
        for (let index = 0; index < accountIds.length; index++) {
          await db.Accounts.destroy({ where: { id: accountIds[index] } });
        }
      }

      if (snapshotId) {
        await db.Snapshots.destroy({ where: { id: snapshotId } });
      }

      if (error instanceof TypeError) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({
          message: "Internal server error - could not process request.",
        });
      }
    } catch (fatalError) {
      res.status(500).json({
        message:
          "Fatal Server Error: Potentially Corrupt Data - Please contact a system administrator to fix the issue.",
      });
    }
  }
});

export default router;
