import { ACCOUNT_TYPES } from "../../../constants";
import {
  ACCOUNTS_PER_SNAPSHOT,
  NUM_OF_USERS,
  SNAPSHOTS_PER_USER,
} from "./constants";
import { AccountSeed, AccountSeedGenerator } from "./types";

/*
 * Generates (n = NUM_OF_USERS * SNAPSHOTS_PER_USER * ACCOUNTS_PER_SNAPSHOT) snapshot seeds for each seed user
 * The Account Type will rotate evenly between "Traditional", "Roth", and "Taxable"
 * There are (n = ACCOUNTS_PER_SNAPSHOT) accounts per snapshot
 * The deleteLocation is the text we will use to reverse the seeding (via the down() method)
 * (i.e. delete... {where: { location = deleteLocation })  )
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
