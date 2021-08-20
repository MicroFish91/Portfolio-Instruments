import { createSelector } from "@reduxjs/toolkit";
import {
  selectHoldingsById,
  selectHoldingsDashboardIds,
} from "./selectHoldingFields";

export const selectMacroBreakdownTotals = createSelector(
  selectHoldingsById,
  selectHoldingsDashboardIds,
  (holdingsById, holdingsList) => {
    const macroBreakdown = new Array(2).fill(0);
    let main = 0;
    let variable = 0;

    holdingsList.forEach((holdingId) => {
      if (!holdingsById[holdingId].variablePortfolio) {
        main += holdingsById[holdingId].total;
      } else {
        variable += holdingsById[holdingId].total;
      }
    });

    macroBreakdown[0] = main;
    macroBreakdown[1] = variable;

    return macroBreakdown;
  }
);

export const selectMacroBreakdownPercentage = createSelector(
  selectHoldingsById,
  selectHoldingsDashboardIds,
  (holdingsById, holdingsList) => {
    const macroBreakdown = new Array(2).fill(0);
    let percentageBreakdown = [];
    let main = 0;
    let variable = 0;
    let total = 0;

    holdingsList.forEach((holdingId) => {
      if (!holdingsById[holdingId].variablePortfolio) {
        main += holdingsById[holdingId].total;
      } else {
        variable += holdingsById[holdingId].total;
      }
    });

    macroBreakdown[0] = main;
    macroBreakdown[1] = variable;
    total = main + variable;

    percentageBreakdown = macroBreakdown.map((macroTotal) => {
      if (total <= 0) {
        return 0;
      } else {
        return parseFloat(
          parseFloat(((macroTotal / total) * 100).toString()).toFixed(2)
        );
      }
    });

    return percentageBreakdown;
  }
);

export const selectVpAssets = createSelector(
  selectHoldingsById,
  selectHoldingsDashboardIds,
  (holdingsById, holdingsList): [string[], number[]] => {
    const vpBreakdown: { [ticker: string]: number } = {};
    let percentageBreakdown: number[] = [];
    let total = 0;

    holdingsList.forEach((holdingId) => {
      if (holdingsById[holdingId].variablePortfolio) {
        total += holdingsById[holdingId].total;
        if (vpBreakdown[holdingsById[holdingId].ticker]) {
          vpBreakdown[holdingsById[holdingId].ticker] +=
            holdingsById[holdingId].total;
        } else {
          vpBreakdown[holdingsById[holdingId].ticker] =
            holdingsById[holdingId].total;
        }
      }
    });

    percentageBreakdown = Object.values(vpBreakdown).map((tickerTotals) => {
      if (total <= 0) {
        return 0;
      } else {
        return parseFloat(
          parseFloat(((tickerTotals / total) * 100).toString()).toFixed(2)
        );
      }
    });

    return [Object.keys(vpBreakdown), percentageBreakdown];
  }
);
