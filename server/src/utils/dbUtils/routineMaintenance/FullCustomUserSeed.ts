import db from "../../../models";
import { AccountAttributes } from "../../../models/accounts";
import { SnapshotAttributes } from "../../../models/snapshots";
import {
  generateCustomAccounts,
  generateCustomHoldings,
  generateCustomSnapshots,
  generateCustomUser,
} from "../seedGenerators/generateFullCustomUser";

export const seedFullCustomUser = (): Promise<void> => {
  return new Promise(async (res, rej) => {
    try {
      const userData = await generateCustomUser();
      const user = await db.Users.create(userData);

      const snapshotData = generateCustomSnapshots(user.id);
      const snapshots = await db.Snapshots.bulkCreate(snapshotData);
      const snapshotIds = snapshots.map((snapshot: SnapshotAttributes) => {
        return snapshot.id;
      });

      const accountData = generateCustomAccounts(snapshotIds);
      const accounts = await db.Accounts.bulkCreate(accountData);
      const accountIds = accounts.map((account: AccountAttributes) => {
        return account.id;
      });

      const holdingData = generateCustomHoldings(accountIds);
      await db.Holdings.bulkCreate(holdingData);

      res();
    } catch (err) {
      console.log(err);
      rej(err);
    }
  });
};
