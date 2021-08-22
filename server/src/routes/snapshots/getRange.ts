import { Request, Response } from "express";
import { QueryTypes } from "sequelize";
import db from "../../models";
import { UserAttributes as User } from "../../models/users";

/*
 * Route: "/range/:years"
 * Inputs: Number of years prior to current date
 * Outputs: Outputs a list of all the snapshots (multiple) that fall within the date range of now
 * minus the number of input years as json.  Does not include accounts/holdings info.
 *
 * Snapshots = [ {}, {}, {} ] where {} = snapshot
 * returns null if no snapshots exist
 */
export const getRange = async (req: Request, res: Response) => {
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
        SUM("combined"."total") as "total",
        (SUM("combined"."fees") / SUM("combined"."total")) as "weightedExpenseRatio"
      from
        "Snapshots"
      inner join
      (
        select
          "Accounts"."id",
          "Accounts"."snapshotId",
          SUM("Holdings"."total") as "total",
          ("Holdings"."total" * "Holdings"."expenseRatio") as "fees"
        from
          "Accounts"
        inner join "Holdings" on
          "Accounts"."id" = "Holdings"."accountId"
        group by
          "Accounts"."id",
          "Accounts"."snapshotId",
          ("Holdings"."total" * "Holdings"."expenseRatio")
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
};
