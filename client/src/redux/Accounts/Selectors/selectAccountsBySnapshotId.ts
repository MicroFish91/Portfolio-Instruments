import { createSelector } from "@reduxjs/toolkit";
import { ReducedAccountById } from "../types";
import {
  selectAccountsAllIds,
  selectAccountsById,
} from "./selectAccountFields";

export const selectAccountsBySnapshotId = (snapshotId: number) => {
  const matchingAccountIdSelector = createSelector(
    selectAccountsById,
    selectAccountsAllIds,
    (accountsById, accountsList) => {
      const matchingAccountIds: ReducedAccountById[] = accountsList.reduce(
        (accumulator, accountId) => {
          if (accountsById[accountId].snapshotId === snapshotId) {
            const account: ReducedAccountById = {
              id: accountId,
              location: accountsById[accountId].location,
              type: accountsById[accountId].type,
            };
            accumulator.push(account);
            return accumulator;
          } else {
            return accumulator;
          }
        },
        [] as ReducedAccountById[]
      );

      return matchingAccountIds;
    }
  );

  return matchingAccountIdSelector;
};
