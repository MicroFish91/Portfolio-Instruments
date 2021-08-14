import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";

export const selectAccountsById = (state: RootState) => state.accounts.byId;
export const selectAccountsDashboardIds = (state: RootState) =>
  state.accounts.dashboardIds;
export const selectAccountsAllIds = (state: RootState) => state.accounts.allIds;

export const selectTraditionalAccounts = createSelector(
  selectAccountsById,
  selectAccountsDashboardIds,
  (accountsById, accountsList) => {
    const traditionalIds: string[] = [];
    accountsList.forEach((accountId) => {
      if (accountsById[accountId].type === "Traditional") {
        traditionalIds.push(accountId);
      }
    });
    return traditionalIds;
  }
);

export const selectRothAccounts = createSelector(
  selectAccountsById,
  selectAccountsDashboardIds,
  (accountsById, accountsList) => {
    const rothIds: string[] = [];
    accountsList.forEach((accountId) => {
      if (accountsById[accountId].type === "Roth") {
        rothIds.push(accountId);
      }
    });
    return rothIds;
  }
);

export const selectTaxableAccounts = createSelector(
  selectAccountsById,
  selectAccountsDashboardIds,
  (accountsById, accountsList) => {
    const taxableIds: string[] = [];
    accountsList.forEach((accountId) => {
      if (accountsById[accountId].type === "Taxable") {
        taxableIds.push(accountId);
      }
    });
    return taxableIds;
  }
);
