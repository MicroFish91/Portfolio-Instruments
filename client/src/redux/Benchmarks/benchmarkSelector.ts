import { createSelector } from "@reduxjs/toolkit";
import {
  selectHoldingsById,
  selectHoldingsDashboardIds,
} from "../Holdings/holdingSelectors";
import { RootState } from "../rootReducer";

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

export const selectBenchmarkBreakdown = createSelector(
  selectAssetTitles,
  selectHoldingsById,
  selectHoldingsDashboardIds,
  (assetTitles, holdingsById, holdingsList) => {
    const benchmarkBreakdown = new Array(assetTitles.length + 1).fill(0);
    let percentageBreakdown = [];
    let nonVariableNetWorth = 0;

    holdingsList.forEach((holdingId) => {
      const assetTitlesIndex = assetTitles.findIndex((assetTitle) => {
        return assetTitle === holdingsById[holdingId].category;
      });
      if (assetTitlesIndex !== -1) {
        if (!holdingsById[holdingId].variablePortfolio) {
          benchmarkBreakdown[assetTitlesIndex] += holdingsById[holdingId].total;
          nonVariableNetWorth += holdingsById[holdingId].total;
        }
      } else {
        if (!holdingsById[holdingId].variablePortfolio) {
          benchmarkBreakdown[benchmarkBreakdown.length - 1] +=
            holdingsById[holdingId].total;
          nonVariableNetWorth += holdingsById[holdingId].total;
        }
      }
    });

    percentageBreakdown = benchmarkBreakdown.map((assetTotal) => {
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
