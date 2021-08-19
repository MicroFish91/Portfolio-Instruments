import { createSelector } from "@reduxjs/toolkit";
import { usdFormatter } from "../../utils";
import {
  selectHoldingsById,
  selectHoldingsDashboardIds,
} from "../Holdings/holdingSelectors";
import { RootState } from "../rootReducer";
import { selectUserRebalanceThreshold } from "../User/userSelectors";
import { AssetRebalanceGeneratorResults, FormattedAssets } from "./types";

export const selectBenchmarkTitle = (state: RootState) =>
  state.benchmarks.benchmarkTitle;
export const selectAssetTitles = (state: RootState) =>
  state.benchmarks.assetTitles;
export const selectAssetRatios = (state: RootState) =>
  state.benchmarks.assetRatios;
export const selectBenchmarkErrorMessage = (state: RootState) =>
  state.benchmarks.error.message;
export const selectBenchmarkErrorStatus = (state: RootState) =>
  state.benchmarks.error.status;
export const selectIsLoading = (state: RootState) => state.benchmarks.isLoading;

export const selectBenchmarkBreakdowns = createSelector(
  selectAssetTitles,
  selectHoldingsById,
  selectHoldingsDashboardIds,
  (assetTitles, holdingsById, holdingsList): number[] => {
    const benchmarkBreakdown = new Array(assetTitles.length + 1).fill(0);

    holdingsList.forEach((holdingId) => {
      const assetTitlesIndex = assetTitles.findIndex((assetTitle) => {
        return assetTitle === holdingsById[holdingId].category;
      });
      if (assetTitlesIndex !== -1) {
        if (!holdingsById[holdingId].variablePortfolio) {
          benchmarkBreakdown[assetTitlesIndex] += holdingsById[holdingId].total;
        }
      } else {
        if (!holdingsById[holdingId].variablePortfolio) {
          benchmarkBreakdown[benchmarkBreakdown.length - 1] +=
            holdingsById[holdingId].total;
        }
      }
    });

    return benchmarkBreakdown;
  }
);

export const selectBenchmarkBreakdownPercentage = createSelector(
  selectBenchmarkBreakdowns,
  (benchmarkBreakdowns: number[]) => {
    let percentageBreakdown = [];
    let nonVariableNetWorth = 0;

    benchmarkBreakdowns.forEach((assetTotal) => {
      nonVariableNetWorth += assetTotal;
    });

    percentageBreakdown = benchmarkBreakdowns.map((assetTotal) => {
      if (nonVariableNetWorth <= 0) {
        return 0;
      } else {
        return parseFloat(
          parseFloat(
            ((assetTotal / nonVariableNetWorth) * 100).toString()
          ).toFixed(2)
        );
      }
    });

    return percentageBreakdown;
  }
);

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

      if (percentDiff >= Math.abs(rebalanceThreshold)) {
        rebalanceRequired = true;
      }

      adjusted.total.push(totalDiff);
      adjusted.formattedTotal.push(dollarFormatter.format(totalDiff));
      adjusted.percent.push(percentDiff);
    }

    return [formattedAssets, rebalanceRequired];
  }
);
