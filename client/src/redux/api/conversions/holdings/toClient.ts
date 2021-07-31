import { HoldingsReducerState } from "../../../Holdings/types";
import { IncomingSnapshotFetchRaw } from "../../types";

export const toClient = (
  serverSnapshot: IncomingSnapshotFetchRaw
): HoldingsReducerState => {
  const reducedHoldings: HoldingsReducerState = {
    byId: {},
    allIds: [],
  };

  serverSnapshot.data.Accounts?.forEach((account) => {
    account.Holdings?.forEach((holding) => {
      reducedHoldings.byId[holding.id] = {
        title: holding.title,
        ticker: holding.ticker,
        category: holding.category,
        total: holding.total,
        expenseRatio: holding.expenseRatio,
        accountId: holding.accountId,
      };
      reducedHoldings.allIds.push(holding.id.toString());
    });
  });

  return reducedHoldings;
};
