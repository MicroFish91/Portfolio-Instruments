import { createSelector } from "@reduxjs/toolkit";
import {
  selectTotalRoth,
  selectTotalTaxable,
  selectTotalTraditional,
} from "./selectCumulativesByInstitution";

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
