import { createSelector } from "@reduxjs/toolkit";
import {
  selectAccountsById,
  selectAccountsBySnapshotId,
  selectAccountsDashboardIds,
  selectRothAccounts,
  selectTaxableAccounts,
  selectTraditionalAccounts,
} from "../Accounts/accountSelectors";
import { RootState } from "../rootReducer";
import { ReducedHoldingsAccount, ReducedHoldingsByAccount } from "./types";

export const selectHoldingsById = (state: RootState) => state.holdings.byId;
export const selectHoldingsDashboardIds = (state: RootState) =>
  state.holdings.dashboardIds;
export const selectHoldingsAllIds = (state: RootState) => state.holdings.allIds;

export const selectTotalsByInstitutions = createSelector(
  selectHoldingsById,
  selectHoldingsDashboardIds,
  selectAccountsById,
  selectAccountsDashboardIds,
  (holdingsById, holdingsIdList, accountsById, accountsIdList) => {
    const institutionTotals: { [accountName: string]: number } = {};
    holdingsIdList.forEach((holdingId) => {
      const holding = holdingsById[holdingId];
      const holdingAccountId = holding.accountId.toString();
      if (accountsIdList.includes(holdingAccountId)) {
        const accountName = accountsById[holding.accountId].location;
        if (institutionTotals[accountName]) {
          institutionTotals[accountName] += holding.total;
        } else {
          institutionTotals[accountName] = holding.total;
        }
      }
    });
    return institutionTotals;
  }
);

export const selectPercentageByInstitutions = createSelector(
  selectTotalsByInstitutions,
  (institutionTotals) => {
    const netWorth = Object.keys(institutionTotals).reduce(
      (acc, accountName) => {
        return acc + institutionTotals[accountName];
      },
      0
    );
    const newPercentages = Object.keys(institutionTotals).reduce(
      (
        acc: { [accountName: string]: number },
        accountName: string
      ): { [accountName: string]: number } => {
        acc[accountName] = (institutionTotals[accountName] / netWorth) * 100;
        return acc;
      },
      {}
    );
    return newPercentages;
  }
);

export const selectTotalTraditional = createSelector(
  selectHoldingsById,
  selectHoldingsDashboardIds,
  selectTraditionalAccounts,
  (holdingsById, holdingsIdList, traditionalAccountIds): number => {
    let traditionalTotal = 0;
    holdingsIdList.forEach((holdingId) => {
      if (
        traditionalAccountIds.includes(
          holdingsById[holdingId].accountId.toString()
        )
      ) {
        traditionalTotal += holdingsById[holdingId].total;
      }
    });
    return traditionalTotal;
  }
);

export const selectTotalRoth = createSelector(
  selectHoldingsById,
  selectHoldingsDashboardIds,
  selectRothAccounts,
  (holdingsById, holdingsIdList, rothAccountIds): number => {
    let rothTotal = 0;
    holdingsIdList.forEach((holdingId) => {
      if (
        rothAccountIds.includes(holdingsById[holdingId].accountId.toString())
      ) {
        rothTotal += holdingsById[holdingId].total;
      }
    });
    return rothTotal;
  }
);

export const selectTotalTaxable = createSelector(
  selectHoldingsById,
  selectHoldingsDashboardIds,
  selectTaxableAccounts,
  (holdingsById, holdingsIdList, taxableAccountIds): number => {
    let taxableTotal = 0;
    holdingsIdList.forEach((holdingId) => {
      if (
        taxableAccountIds.includes(holdingsById[holdingId].accountId.toString())
      ) {
        taxableTotal += holdingsById[holdingId].total;
      }
    });
    return taxableTotal;
  }
);

export const selectTaxShelterPercentages = createSelector(
  selectTotalTraditional,
  selectTotalRoth,
  selectTotalTaxable,
  (traditional, roth, taxable) => {
    const netWorth = traditional + roth + taxable;
    const taxShelterMap = {
      traditional: (traditional / netWorth) * 100,
      roth: (roth / netWorth) * 100,
      taxable: (taxable / netWorth) * 100,
    };
    return taxShelterMap;
  }
);

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
