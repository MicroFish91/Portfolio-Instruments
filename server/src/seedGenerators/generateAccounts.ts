import {
  ACCOUNTS_PER_SNAPSHOT,
  DEFAULT_ACCOUNT_LOCATIONS,
} from "../constants/seeder";

interface AccountSeedGenerator {
  up: AccountSeed[];
  down: UserEmail[];
}

interface AccountSeed {
  location: string;
  type: string;
  snapshotId: number;
  createdAt: Date;
  updatedAt: Date;
}

type UserEmail = string;

/*
 * 5 accounts per snapshot
 */
export function generateUsers() {
  const accountSeedGenerator: AccountSeedGenerator = {
    up: [],
    down: [],
  };

  return accountSeedGenerator;
}
