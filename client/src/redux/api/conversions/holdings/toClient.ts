import { HoldingsDashboardReducer } from "../../../Holdings/types";
import { IncomingSnapshotFetchRaw } from "../../types";

export const toClient = (
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
        accountId: holding.accountId,
      };
      reducedHoldings.dashboardIds.push(holding.id.toString());
    });
  });

  return reducedHoldings;
};
