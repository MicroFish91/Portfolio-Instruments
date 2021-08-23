import { createSelector } from "reselect";
import { ASSET_CODE } from "../../../constants";
import { selectTaxableAccounts } from "../../Accounts/Selectors/selectAccountTypes";
import {
  selectHoldingsAllIds,
  selectHoldingsById,
} from "./selectHoldingFields";

export const selectLiquidCash = createSelector(
  selectTaxableAccounts,
  selectHoldingsById,
  selectHoldingsAllIds,
  (taxableAccountIds, holdingsById, holdingsList) => {
    let liquidTotal = 0;

    holdingsList.forEach((holdingId) => {
      const holdingIsTaxable = taxableAccountIds.includes(
        holdingsById[holdingId].accountId.toString()
      );
      const holdingIsCash =
        holdingsById[holdingId].category === ASSET_CODE.CASH;

      if (holdingIsTaxable && holdingIsCash) {
        liquidTotal += holdingsById[holdingId].total;
      }
    });

    return liquidTotal;
  }
);
