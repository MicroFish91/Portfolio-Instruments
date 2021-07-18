import db from "../models";
import { generateAccounts } from "../seedGenerators";

interface AccountSeeder {
  up: () => Promise<void>;
  down: () => Promise<void>;
}

export const AccountSeeder: AccountSeeder = {
  up: () => {
    return new Promise((res, rej) => {
      try {
        generateAccounts().up.forEach(async (account) => {
          await db.Accounts.create(account);
        });
        res();
      } catch (err) {
        rej(err);
      }
    });
  },
  down: () => {
    return new Promise((res, rej) => {
      try {
        // Remove all snapshots that have the ${deleteNotes} text (see generateSnapshots)
        generateAccounts().down.forEach(async (accountLocation) => {
          await db.Accounts.destroy({
            where: {
              location: accountLocation,
            },
          });
        });
        res();
      } catch (err) {
        rej(err);
      }
    });
  },
};
