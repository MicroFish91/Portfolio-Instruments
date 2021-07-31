import { createSelector } from "@reduxjs/toolkit";
import {
  selectRothAccounts,
  selectTaxableAccounts,
  selectTraditionalAccounts,
} from "../Accounts/accountSelectors";
import { RootState } from "../rootReducer";

export const selectHoldingsById = (state: RootState) => state.holdings.byId;
export const selectHoldingsIdList = (state: RootState) => state.holdings.allIds;

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
