export interface UserSeedGenerator {
  up: UserSeed[];
  down: UserEmail[];
}

export interface UserSeed {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  benchmark: string;
  confirmed: boolean;
  customBenchmark: string | null;
  rebalanceThreshold: number;
  vpThreshold: number;
  lastLoggedIn: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type UserEmail = string;

export interface SnapshotSeedGenerator {
  up: SnapshotSeed[];
  down: DeleteNote;
}

export interface SnapshotSeed {
  title: string;
  benchmark: string;
  notes: DeleteNote;
  specifiedDate: Date;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export type DeleteNote = string;
export type SpecifiedDates = Date[];

export interface AccountSeedGenerator {
  up: AccountSeed[];
  down: DeleteLocation[];
}

export interface AccountSeed {
  location: string;
  type: string;
  snapshotId: number;
  createdAt: Date;
  updatedAt: Date;
}

export type DeleteLocation = string;

export interface HoldingSeedGenerator {
  up: HoldingSeed[];
  down: DeleteTitle[];
}

export interface HoldingSeed {
  title: string;
  ticker: string;
  category: string;
  total: number;
  expenseRatio: number;
  variablePortfolio: boolean;
  accountId: number;
  createdAt: Date;
  updatedAt: Date;
}

export type DeleteTitle = string;
