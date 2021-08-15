export type HoldingsReducerState = {
  byId: { [id: string]: ReducedHoldings };
  dashboardIds: string[];
  allIds: string[];
};

export type HoldingsDashboardReducer = {
  byId: { [id: string]: ReducedHoldings };
  dashboardIds: string[];
};

export type HoldingsPaginateReducer = {
  byId: { [id: string]: ReducedHoldings };
  allIds: string[];
};

export type ReducedHoldings = {
  title: string;
  ticker: string;
  category: string;
  total: number;
  expenseRatio: number;
  accountId: number;
};
