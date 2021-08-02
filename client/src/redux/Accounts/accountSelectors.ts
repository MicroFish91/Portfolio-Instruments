import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";

export const selectAccountsById = (state: RootState) => state.accounts.byId;
export const selectAccountsIdList = (state: RootState) => state.accounts.allIds;

// export const selectAccountsBySnapshotId = (snapshotId) => {
//   return createSelector(
//     selectAccountsById,
//     selectAccountsIdList,
//     (accountsById, accountsList) => {
//       const accountIdList = [];
//       accountsList.forEach(accountId => {
//         if(accountsById[accountId].snapshotId === snapshotId)
//       })
//     }
//   )
// }

export const selectTraditionalAccounts = createSelector(
  selectAccountsById,
  selectAccountsIdList,
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
  selectAccountsIdList,
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
  selectAccountsIdList,
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
