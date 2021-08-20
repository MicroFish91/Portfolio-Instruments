import { createSelector } from "@reduxjs/toolkit";
import { usdFormatter } from "../../../utils";
import {
  selectMacroBreakdownPercentage,
  selectMacroBreakdownTotals,
} from "../../Holdings/Selectors/selectHoldingsByDashboardBreakdown";
import { selectUserVpThreshold } from "../../User/Selectors";
import { FormattedMacros, VpRebalanceGeneratorResults } from "../types";

export const selectVpRebalanceFormat = createSelector(
  selectMacroBreakdownTotals,
  selectMacroBreakdownPercentage,
  selectUserVpThreshold,
  (
    macroBreakdownTotals: number[],
    macroBreakdownPercentages: number[],
    vpThreshold: number
  ): VpRebalanceGeneratorResults => {
    const dollarFormatter = usdFormatter();
    const netTotal = macroBreakdownTotals[0] + macroBreakdownTotals[1];
    const goalTotals = [
      (netTotal * (100 - vpThreshold)) / 100,
      (netTotal * vpThreshold) / 100,
    ];

    const formattedAssets: FormattedMacros = {
      macroTitles: ["Main", "Variable"],
      currentAllocation: {
        total: [...macroBreakdownTotals],
        formattedTotal: macroBreakdownTotals.map((total) => {
          return dollarFormatter.format(total);
        }),
        percent: [...macroBreakdownPercentages],
      },
      adjusted: {
        total: [],
        formattedTotal: [],
        percent: [],
      },
      goalAllocation: {
        total: goalTotals,
        formattedTotal: goalTotals.map((total) => {
          return dollarFormatter.format(total);
        }),
        percent: [100 - vpThreshold, vpThreshold],
      },
    };

    const adjusted = formattedAssets.adjusted;
    const current = formattedAssets.currentAllocation;
    const goal = formattedAssets.goalAllocation;
    let rebalanceRequired = false;

    if (macroBreakdownTotals[1] > (vpThreshold / 100) * netTotal) {
      rebalanceRequired = true;
    }

    adjusted.total[0] = goal.total[0] - current.total[0];
    adjusted.total[1] = goal.total[1] - current.total[1];
    adjusted.percent[0] = goal.percent[0] - current.percent[0];
    adjusted.percent[1] = goal.percent[1] - current.percent[1];

    adjusted.formattedTotal = adjusted.total.map((total) => {
      return dollarFormatter.format(total);
    });

    return [formattedAssets, rebalanceRequired];
  }
);
