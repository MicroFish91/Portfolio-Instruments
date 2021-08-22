import { Request, Response } from "express";
import db from "../../models";
import { UserAttributes as User } from "../../models/users";
import {
  validateAccount,
  validateHolding,
  validateSnapshot,
} from "../../models/validation";
import { IncomingSnapshot } from "../../models/validation/types";

// * Route: "/"
// * Post a snapshot to database (includes nested posts to accounts and holdings)
export const postOne = async (req: Request, res: Response) => {
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
          variablePortfolio: holdingData[holdingIndex].variablePortfolio,
          accountId: accountIds[accountIds.length - 1],
        };

        let { error } = validateHolding(postHolding);
        if (error) throw new TypeError(error.message);

        const holding = await db.Holdings.create(postHolding);
        holdingIds.push(holding.dataValues.id);
      }
    }

    return res.json({ message: "Success." });
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
        return res.status(400).json({ message: error.message });
      } else {
        return res.status(500).json({
          message: "Internal server error - could not process request.",
        });
      }
    } catch (fatalError) {
      return res.status(500).json({
        message:
          "Fatal Server Error: Potentially Corrupt Data - Please contact a system administrator to fix the issue.",
      });
    }
  }
};
