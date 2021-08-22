import { createSelector } from "@reduxjs/toolkit";
import {
  selectAccountsById,
  selectAccountsDashboardIds,
} from "../../Accounts/Selectors/selectAccountFields";

export const selectLatestSnapshotId = createSelector(
  selectAccountsById,
  selectAccountsDashboardIds,
  (accountsById, accountsList) => {
    return accountsById[accountsList[0]].snapshotId;
  }
);
