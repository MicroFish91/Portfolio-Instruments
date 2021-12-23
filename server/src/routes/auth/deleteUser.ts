import { Request, Response } from "express";
import db from "../../models";
import { AccountAttributes } from "../../models/accounts";
import { HoldingAttributes } from "../../models/holdings";
import { SnapshotAttributes } from "../../models/snapshots";
import { UserAttributes as User } from "../../models/users";

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.user as User;
  const user = await db.Users.findOne({ where: { id } });

  const snapshots = await db.Snapshots.findAll({
    where: { userId: user.id },
  });

  const snapshotIds = snapshots.map((snapshot: SnapshotAttributes) => {
    return snapshot.id;
  });

  const accounts = await db.Accounts.findAll({
    where: { snapshotId: snapshotIds },
  });

  const accountIds = accounts.map((account: AccountAttributes) => {
    return account.id;
  });

  const holdings = await db.Holdings.findAll({
    where: { accountId: accountIds },
  });

  const holdingIds = holdings.map((holding: HoldingAttributes) => {
    return holding.id;
  });

  await db.Holdings.destroy({ where: { id: holdingIds } });
  await db.Accounts.destroy({ where: { id: accountIds } });
  await db.Snapshots.destroy({ where: { id: snapshotIds } });
  await db.Users.destroy({ where: { id: user.id } });

  res.json({ message: "Success." });
};
