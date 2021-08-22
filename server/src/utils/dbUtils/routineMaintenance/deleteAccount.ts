import db from "../../../models";
import { AccountAttributes } from "../../../models/accounts";
import { HoldingAttributes } from "../../../models/holdings";
import { SnapshotAttributes } from "../../../models/snapshots";

export const deleteAccount = async (email: string): Promise<void> => {
  try {
    const user = await db.Users.findOne({ where: { email } });
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

    console.log("Success.");
  } catch (err) {
    console.log(err);
  }
};
