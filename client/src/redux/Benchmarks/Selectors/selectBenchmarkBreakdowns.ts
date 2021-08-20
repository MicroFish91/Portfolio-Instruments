import { createSelector } from "@reduxjs/toolkit";
import {
  selectHoldingsById,
  selectHoldingsDashboardIds,
} from "../../Holdings/Selectors/selectHoldingFields";
import { selectAssetTitles } from "./selectBenchmarkFields";

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
