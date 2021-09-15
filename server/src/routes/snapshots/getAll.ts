import { Request, Response } from "express";
import { QueryTypes } from "sequelize";
import db from "../../models";
import { UserAttributes as User } from "../../models/users";

// * Route: "/all"
export const getAll = async (req: Request, res: Response) => {
  const { id } = req.user as User;
  const mergedSnapshots = [];

  // Has nested account/holding breakdowns
  const snapshotBreakdown = await db.Snapshots.findAll({
    where: { userId: id },
    include: {
      model: db.Accounts,
      include: {
        model: db.Holdings,
      },
    },
    order: [["specifiedDate", "DESC"]],
  });

  // Has summed totals and weightedExpenseRatios
  const snapshotDetails = await db.sequelize.query(
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
        "Snapshots"."userId" = :id
      group by
        "Snapshots"."id",
        "Snapshots"."title",
        "Snapshots"."benchmark",
        "Snapshots"."notes",
        "Snapshots"."specifiedDate"
      order by
        "Snapshots"."specifiedDate" desc`,
    {
      replacements: { id },
      type: QueryTypes.SELECT,
    }
  );

  // Merge formatting of snapshotBreakdown and snapshotDetails
  for (
    let snapshotIndex = 0;
    snapshotIndex < snapshotDetails.length;
    snapshotIndex++
  ) {
    const breakdownIndex = snapshotBreakdown.findIndex((snapshot: any) => {
      return snapshot.dataValues.id === snapshotDetails[snapshotIndex].id;
    });

    const snapshot = {
      ...snapshotBreakdown[breakdownIndex].dataValues,
      total: snapshotDetails[snapshotIndex].total,
      weightedExpenseRatio: snapshotDetails[snapshotIndex].weightedExpenseRatio,
    };

    mergedSnapshots.push(snapshot);
  }

  // Display only the data based on the page number provided
  res.json(mergedSnapshots);
};
