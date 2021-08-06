import { createSelector } from "@reduxjs/toolkit";
import {
  selectAccountsById,
  selectAccountsIdList,
  selectRothAccounts,
  selectTaxableAccounts,
  selectTraditionalAccounts,
} from "../Accounts/accountSelectors";
import { RootState } from "../rootReducer";

export const selectHoldingsById = (state: RootState) => state.holdings.byId;
export const selectHoldingsIdList = (state: RootState) => state.holdings.allIds;

export const selectTotalsByInstitutions = createSelector(
  selectHoldingsById,
  selectHoldingsIdList,
  selectAccountsById,
  selectAccountsIdList,
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

export const selectPercentageByInstitution = createSelector(
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
  selectHoldingsIdList,
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
  selectHoldingsIdList,
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
  selectHoldingsIdList,
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
