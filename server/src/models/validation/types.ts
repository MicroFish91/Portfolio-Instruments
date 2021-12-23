export type IncomingSnapshot = {
  title: string;
  benchmark: string;
  notes: string;
  specifiedDate: string;
  userId?: number;
  accounts: IncomingAccount[];
};

export type IncomingAccount = {
  location: string;
  type: string;
  snapshotId?: number;
  holdings: IncomingHolding[];
};

export type IncomingHolding = {
  title: string;
  ticker: string;
  category: string;
  total: number;
  expenseRatio: number;
  variablePortfolio: boolean;
  accountId?: number;
};

export type custBenchmark = {
  title: string;
  assetTitles: string[];
  assetRatios: number[];
};

// -------- Raw Record Layout ---------

export type SnapshotRecord = {
  id: number;
  title: string;
  benchmark: string;
  notes: string;
  Accounts?: AccountRecord[];
  userId: number;
  specifiedDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type AccountRecord = {
  id: number;
  location: string;
  type: "Taxable" | "Roth" | "Traditional";
  snapshotId: number;
  Holdings?: HoldingRecord[];
  createdAt: Date;
  updatedAt: Date;
};

export type HoldingRecord = {
  id: number;
  title: string;
  ticker: string;
  category: string;
  variablePortfolio: boolean;
  total: string;
  expenseRatio: string;
  accountId: number;
  createdAt: Date;
  updatedAt: Date;
};
