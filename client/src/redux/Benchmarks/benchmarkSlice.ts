import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PORTFOLIO_BENCHMARKS } from "../../constants";
import {
  BenchmarkError,
  BenchmarkReducerState,
  CustomBenchmark,
} from "./types";

const INITIAL_STATE: BenchmarkReducerState = {
  benchmarkTitle: "",
  assetTitles: [],
  assetRatios: [],
  customBenchmark: null,
  error: {
    status: "",
    message: "",
  },
  isLoading: false,
};

const benchmarkSlice = createSlice({
  name: "benchmarks",
  initialState: INITIAL_STATE,
  reducers: {
    initGetBenchmark: (
      state,
      _payload: PayloadAction<string | undefined>
    ): void => {
      state.isLoading = true;
    },
    initPostBenchmark: (
      state,
      _payload: PayloadAction<string | undefined>
    ): void => {
      state.isLoading = true;
    },
    initGetCustomBenchmark: (
      state,
      _payload: PayloadAction<string | undefined>
    ): void => {
      state.isLoading = true;
    },
    initPostCustomBenchmark: (
      state,
      _payload: PayloadAction<CustomBenchmark>
    ): void => {
      state.isLoading = true;
    },
    initRemoveFromCustomBenchmark: (
      state,
      _payload: PayloadAction<string>
    ): void => {
      state.isLoading = true;
    },
    setBenchmark: (state, { payload }: PayloadAction<string>): void => {
      const customBenchmarks = state.customBenchmark;

      // Set Custom Benchmark
      if (customBenchmarks && customBenchmarks[payload]) {
        state.benchmarkTitle = payload;
        state.assetTitles = customBenchmarks[payload].assetCategories;
        state.assetRatios = customBenchmarks[payload].assetPercentages;
        state.error = {
          status: "",
          message: "",
        };
        state.isLoading = false;
      } else {
        // Set Preset Benchmark
        const benchmarkIndex = PORTFOLIO_BENCHMARKS.assetNames.findIndex(
          (portfolioName) => {
            return payload === portfolioName;
          }
        );

        // Must be an existing preset benchmark
        if (benchmarkIndex !== -1) {
          state.benchmarkTitle =
            PORTFOLIO_BENCHMARKS.assetNames[benchmarkIndex];
          state.assetTitles = PORTFOLIO_BENCHMARKS.assetTitles[benchmarkIndex];
          state.assetRatios = PORTFOLIO_BENCHMARKS.assetRatios[benchmarkIndex];

          state.error = {
            status: "",
            message: "",
          };
          state.isLoading = false;
        } else {
          state.error = {
            status: "422",
            message: "Could not set benchmark. Benchmark not found.",
          };
          state.isLoading = false;
        }
      }
    },
    setCustomBenchmark: (state, { payload }: PayloadAction<string>): void => {
      state.customBenchmark = payload ? JSON.parse(payload) : null;
      state.isLoading = false;
    },
    setBenchmarkError: (state, { payload }: PayloadAction<BenchmarkError>) => {
      state.benchmarkTitle = "";
      state.assetTitles = [];
      state.assetRatios = [];
      state.error = {
        status: payload.status,
        message: payload.message,
      };
      state.isLoading = false;
    },
    setCustomBenchmarkError: (
      state,
      { payload }: PayloadAction<BenchmarkError>
    ) => {
      state.error = {
        status: payload.status,
        message: payload.message,
      };
      state.isLoading = false;
    },
    clearBenchmark: (state): void => {
      state.benchmarkTitle = "";
      state.assetTitles = [];
      state.assetRatios = [];
      state.error = {
        status: "",
        message: "",
      };
      state.isLoading = false;
    },
  },
});

export const {
  initGetBenchmark: initGetBenchmarkAction,
  initGetCustomBenchmark: initGetCustomBenchmarkAction,
  initPostBenchmark: initPostBenchmarkAction,
  initPostCustomBenchmark: initPostCustomBenchmarkAction,
  initRemoveFromCustomBenchmark: initRemoveFromCustomBenchmarkAction,
  clearBenchmark: clearBenchmarkAction,
  setBenchmark: setBenchmarkAction,
  setCustomBenchmark: setCustomBenchmarkAction,
  setBenchmarkError: setBenchmarkErrorAction,
  setCustomBenchmarkError: setCustomBenchmarkErrorAction,
} = benchmarkSlice.actions;

export default benchmarkSlice.reducer;
