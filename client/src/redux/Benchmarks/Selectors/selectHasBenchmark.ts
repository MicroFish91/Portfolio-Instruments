import { createSelector } from "@reduxjs/toolkit";
import { selectBenchmarkTitle } from "./selectBenchmarkFields";

export const selectHasBenchmark = createSelector(
  selectBenchmarkTitle,
  (benchmarkTitle) => {
    if (benchmarkTitle) {
      return true;
    } else {
      return false;
    }
  }
);
