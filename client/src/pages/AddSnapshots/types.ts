export type SnapshotFormatted = {
  snapshotTitle: string;
  snapshotDate: string;
  snapshotNotes: string;
  snapshotBenchmark: string;
  accounts: Snapshot;
};

export type Snapshot = Account[];

export type Account = {
  accountName: string;
  accountType: {
    traditional: Holding[];
    roth: Holding[];
    taxable: Holding[];
    [accountType: string]: Holding[];
  };
};

export type Holding = {
  holdingTitle: string;
  holdingTicker: string;
  holdingExpenseRatio: number;
  holdingAmount: number;
  holdingVP: boolean;
  assetType: string;
};
