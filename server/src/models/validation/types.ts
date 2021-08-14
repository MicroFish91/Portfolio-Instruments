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
  accountId?: number;
};
