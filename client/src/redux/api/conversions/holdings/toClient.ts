import {
  HoldingsDashboardReducer,
  HoldingsPaginateReducer,
} from "../../../Holdings/types";
import {
  IncomingPaginateSnapshotsFetchRaw,
  IncomingSnapshotFetchRaw,
} from "../../types";

export const toClientDashboard = (
  serverSnapshot: IncomingSnapshotFetchRaw
): HoldingsDashboardReducer => {
  const reducedHoldings: HoldingsDashboardReducer = {
    byId: {},
    dashboardIds: [],
  };

  serverSnapshot.data.Accounts?.forEach((account) => {
    account.Holdings?.forEach((holding) => {
      reducedHoldings.byId[holding.id] = {
        title: holding.title,
        ticker: holding.ticker,
        category: holding.category,
        total: parseFloat(holding.total),
        expenseRatio: parseFloat(holding.expenseRatio),
        variablePortfolio: holding.variablePortfolio,
        accountId: holding.accountId,
      };
      reducedHoldings.dashboardIds.push(holding.id.toString());
    });
  });

  return reducedHoldings;
};

export const toClientPaginate = (
  serverSnapshot: IncomingPaginateSnapshotsFetchRaw
): HoldingsPaginateReducer => {
  const reducedHoldings: HoldingsPaginateReducer = {
    byId: {},
    allIds: [],
  };

  serverSnapshot.data.forEach((snapshot) => {
    snapshot.Accounts.forEach((account) => {
      account.Holdings?.forEach((holding) => {
        reducedHoldings.byId[holding.id] = {
          title: holding.title,
          ticker: holding.ticker,
          category: holding.category,
          variablePortfolio: holding.variablePortfolio,
          total: parseFloat(holding.total),
          expenseRatio: parseFloat(holding.expenseRatio),
          accountId: holding.accountId,
        };
        reducedHoldings.allIds.push(holding.id.toString());
      });
    });
  });

  return reducedHoldings;
};
