import { createSelector } from "@reduxjs/toolkit";
import { usdFormatter } from "../../../utils";
import { selectUserRebalanceThreshold } from "../../User/Selectors/selectUserFields";
import { AssetRebalanceGeneratorResults, FormattedAssets } from "../types";
import {
  selectBenchmarkBreakdownPercentage,
  selectBenchmarkBreakdowns,
} from "./selectBenchmarkBreakdowns";
import { selectAssetRatios, selectAssetTitles } from "./selectBenchmarkFields";

export const selectAssetRebalanceFormat = createSelector(
  selectAssetTitles,
  selectAssetRatios,
  selectBenchmarkBreakdowns,
  selectBenchmarkBreakdownPercentage,
  selectUserRebalanceThreshold,
  (
    assetTitles: string[],
    goalAllocationPercentages: number[],
    currentAllocationTotals: number[],
    currentAllocationPercentages: number[],
    rebalanceThreshold: number
  ): AssetRebalanceGeneratorResults => {
    const dollarFormatter = usdFormatter();
    const sumTotal = currentAllocationTotals.reduce((acc, assetTotal) => {
      return acc + assetTotal;
    }, 0);
    const formattedAssets: FormattedAssets = {
      assetTitles:
        currentAllocationTotals[currentAllocationTotals.length - 1] === 0
          ? [...assetTitles]
          : [...assetTitles, "Other"],
      currentAllocation: {
        total: currentAllocationTotals,
        formattedTotal: currentAllocationTotals.map((total) => {
          return dollarFormatter.format(total);
        }),
        percent: [...currentAllocationPercentages],
      },
      adjusted: {
        total: [],
        formattedTotal: [],
        percent: [],
      },
      goalAllocation: {
        total: goalAllocationPercentages.map((percentage) => {
          return (percentage / 100) * sumTotal;
        }),
        formattedTotal: goalAllocationPercentages.map((percentage) => {
          return dollarFormatter.format((percentage / 100) * sumTotal);
        }),
        percent: [...goalAllocationPercentages],
      },
    };
    let rebalanceRequired = false;

    if (formattedAssets.assetTitles.length < currentAllocationTotals.length) {
      formattedAssets.currentAllocation.total.pop();
      formattedAssets.currentAllocation.formattedTotal.pop();
      formattedAssets.currentAllocation.percent.pop();
    } else {
      formattedAssets.goalAllocation.total.push(0);
      formattedAssets.goalAllocation.formattedTotal.push("$0.00");
      formattedAssets.goalAllocation.percent.push(0);
    }

    for (let index = 0; index < formattedAssets.assetTitles.length; index++) {
      const adjusted = formattedAssets.adjusted;
      const current = formattedAssets.currentAllocation;
      const goal = formattedAssets.goalAllocation;
      const totalDiff = goal.total[index] - current.total[index];
      const percentDiff = goal.percent[index] - current.percent[index];

      if (Math.abs(percentDiff) > rebalanceThreshold) {
        rebalanceRequired = true;
      }

      adjusted.total.push(totalDiff);
      adjusted.formattedTotal.push(dollarFormatter.format(totalDiff));
      adjusted.percent.push(percentDiff);
    }

    return [formattedAssets, rebalanceRequired];
  }
);
