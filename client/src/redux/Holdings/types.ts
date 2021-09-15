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
  variablePortfolio: boolean;
  accountId: number;
};

export type ReducedHoldingsByAccount = {
  [accountLocation: string]: ReducedHoldingsAccount;
};

export type ReducedHoldingsAccount = {
  accountName: string;
  accountType: {
    traditional: ReducedHoldingByAccount[];
    roth: ReducedHoldingByAccount[];
    taxable: ReducedHoldingByAccount[];
    [accountType: string]: ReducedHoldingByAccount[];
  };
};

export type ReducedHoldingByAccount = {
  title: string;
  ticker: string;
  category: string;
  variablePortfolio: boolean;
  total: number;
  expenseRatio: number;
};
