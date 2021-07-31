export type HoldingsReducerState = {
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
