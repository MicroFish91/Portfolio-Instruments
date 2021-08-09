import { RootState } from "../rootReducer";

export const selectBenchmarkTitle = (state: RootState) =>
  state.benchmarks.benchmarkTitle;
export const selectAssetTitles = (state: RootState) =>
  state.benchmarks.assetTitles;
export const selectAssetRatios = (state: RootState) =>
  state.benchmarks.assetRatios;
export const selectIsLoading = (state: RootState) => state.benchmarks.isLoading;
