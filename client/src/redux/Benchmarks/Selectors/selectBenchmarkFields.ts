import { RootState } from "../../rootReducer";

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
export const selectCustomBenchmarks = (state: RootState) =>
  state.benchmarks.customBenchmark;
export const selectIsLoading = (state: RootState) => state.benchmarks.isLoading;
