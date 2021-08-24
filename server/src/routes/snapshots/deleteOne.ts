import { Request, Response } from "express";
import db from "../../models";

export const deleteOne = async (req: Request, res: Response) => {
  const { snapshotId, accountIds, holdingIds } = req.body.payload as {
    snapshotId: number;
    accountIds: string[];
    holdingIds: string[];
  };

  await db.Holdings.destroy({ where: { id: holdingIds } });
  await db.Accounts.destroy({ where: { id: accountIds } });
  await db.Snapshots.destroy({ where: { id: snapshotId } });

  res.json({ message: "Success." });
};
