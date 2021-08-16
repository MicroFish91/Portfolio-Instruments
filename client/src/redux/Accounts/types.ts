export type AccountsReducerState = {
  byId: { [id: string]: ReducedAccount };
  dashboardIds: string[];
  allIds: string[];
};

export type AccountsDashboardReducer = {
  byId: { [id: string]: ReducedAccount };
  dashboardIds: string[];
};

export type AccountsPaginateReducer = {
  byId: { [id: string]: ReducedAccount };
  allIds: string[];
};

export type ReducedAccount = {
  location: string;
  type: "Traditional" | "Roth" | "Taxable";
  snapshotId: number;
};

export type ReducedAccountById = {
  id: string;
  location: string;
  type: string;
};
