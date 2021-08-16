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
});

router.get("/all", requireJwt, async (req, res) => {
  const { id } = req.user as User;
  const mergedSnapshots = [];

  try {
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
        weightedExpenseRatio:
          snapshotDetails[snapshotIndex].weightedExpenseRatio,
      };

      mergedSnapshots.push(snapshot);
    }

    // Display only the data based on the page number provided
    res.json(mergedSnapshots);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error - could not process request." });
  }
});

// Post a snapshot to database (includes nested posts to accounts and holdings)
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

router.delete("/", requireJwt, async (req, res) => {
  const { snapshotId, accountIds, holdingIds } = req.body.payload as {
    snapshotId: number;
    accountIds: string[];
    holdingIds: string[];
  };

  try {
    await db.Holdings.destroy({ where: { id: holdingIds } });
    await db.Accounts.destroy({ where: { id: accountIds } });
    await db.Snapshots.destroy({ where: { id: snapshotId } });

    res.json({ message: "Success." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error - could not process request." });
  }
});

export default router;
