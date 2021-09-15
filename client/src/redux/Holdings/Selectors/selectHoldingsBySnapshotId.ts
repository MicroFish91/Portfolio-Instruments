import { createSelector } from "@reduxjs/toolkit";
import { selectAccountsBySnapshotId } from "../../Accounts/Selectors/selectAccountsBySnapshotId";
import { ReducedHoldingsAccount, ReducedHoldingsByAccount } from "../types";
import {
  selectHoldingsAllIds,
  selectHoldingsById,
} from "./selectHoldingFields";

export const selectHoldingsBySnapshotId = (snapshotId: number) => {
  const matchingHoldingIdSelector = createSelector(
    selectHoldingsById,
    selectHoldingsAllIds,
    selectAccountsBySnapshotId(snapshotId),
    (holdingsById, holdingsList, accountIds) => {
      const accountHoldings: ReducedHoldingsByAccount = {};
      let snapshot: ReducedHoldingsAccount[] = [];

      accountIds.forEach((account) => {
        const holdingIds = holdingsList.filter((holdingId) => {
          return holdingsById[holdingId].accountId === parseInt(account.id);
        });

        if (accountHoldings[account.location]) {
          accountHoldings[account.location].accountType[
            account.type.toLowerCase()
          ] = holdingIds.map((holdingId) => {
            return {
              title: holdingsById[holdingId].title,
              ticker: holdingsById[holdingId].ticker,
              category: holdingsById[holdingId].category,
              variablePortfolio: holdingsById[holdingId].variablePortfolio,
              total: holdingsById[holdingId].total,
              expenseRatio: holdingsById[holdingId].expenseRatio,
            };
          });
        } else {
          accountHoldings[account.location] = {
            accountName: account.location,
            accountType: {
              traditional: [],
              roth: [],
              taxable: [],
            },
          };
          accountHoldings[account.location].accountType[
            account.type.toLowerCase()
          ] = holdingIds.map((holdingId) => {
            return {
              title: holdingsById[holdingId].title,
              ticker: holdingsById[holdingId].ticker,
              category: holdingsById[holdingId].category,
              variablePortfolio: holdingsById[holdingId].variablePortfolio,
              total: holdingsById[holdingId].total,
              expenseRatio: holdingsById[holdingId].expenseRatio,
            };
          });
        }
      });

      for (const key of Object.keys(accountHoldings)) {
        snapshot.push(accountHoldings[key]);
      }

      return snapshot;
    }
  );

  return matchingHoldingIdSelector;
};
