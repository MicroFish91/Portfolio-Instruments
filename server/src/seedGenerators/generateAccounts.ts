import { ACCOUNT_TYPES } from "../constants/index";
import {
  ACCOUNTS_PER_SNAPSHOT,
  NUM_OF_USERS,
  SNAPSHOTS_PER_USER,
} from "../constants/seeder";

interface AccountSeedGenerator {
  up: AccountSeed[];
  down: DeleteLocation[];
}

interface AccountSeed {
  location: string;
  type: string;
  snapshotId: number;
  createdAt: Date;
  updatedAt: Date;
}

type DeleteLocation = string;

/*
 * 5 accounts per snapshot
 */
export function generateAccounts() {
  const accountSeedGenerator: AccountSeedGenerator = {
    up: [],
    down: [],
  };
  const numberOfAccounts =
    NUM_OF_USERS * SNAPSHOTS_PER_USER * ACCOUNTS_PER_SNAPSHOT;

  let snapshotIdIndex = 1;
  let accountTypeIndex = 0;

  for (let index = 0; index < numberOfAccounts; index++) {
    let checking = {
      location: `TEST LOCATION ${index + 1}`,
      type: ACCOUNT_TYPES[accountTypeIndex],
      snapshotId: snapshotIdIndex,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log(checking);

    accountSeedGenerator.up.push({
      location: `TEST LOCATION ${index + 1}`,
      type: ACCOUNT_TYPES[accountTypeIndex],
      snapshotId: snapshotIdIndex,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as AccountSeed);

    accountSeedGenerator.down.push(`TEST LOCATION ${index + 1}`);

    accountTypeIndex++;

    if (accountTypeIndex > 2) {
      accountTypeIndex = 0;
    }

    if ((index + 1) % ACCOUNTS_PER_SNAPSHOT === 0 && index + 1 > 4) {
      snapshotIdIndex++;
    }
  }

  return accountSeedGenerator;
}
