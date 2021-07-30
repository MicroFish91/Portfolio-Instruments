export type AccountsReducerState = {
  byId: { [id: string]: ReducedAccount };
  allIds: string[];
};

export type ReducedAccount = {
  location: string;
  type: "Traditional" | "Roth" | "Taxable";
  snapshotId: number;
};
