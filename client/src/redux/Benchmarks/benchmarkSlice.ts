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
    setBenchmark: (state, { payload }: PayloadAction<string>): void => {
      const benchmarkIndex = PORTFOLIO_BENCHMARKS.assetNames.findIndex(
        (portfolioName) => {
          return payload === portfolioName;
        }
      );
      state.benchmarkTitle = PORTFOLIO_BENCHMARKS.assetNames[benchmarkIndex];
      state.assetTitles = PORTFOLIO_BENCHMARKS.assetTitles[benchmarkIndex];
      state.assetRatios = PORTFOLIO_BENCHMARKS.assetRatios[benchmarkIndex];
      state.error = {
        status: "",
        message: "",
      };
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
  clearBenchmark: clearBenchmarkAction,
  setBenchmark: setBenchmarkAction,
  setBenchmarkError: setBenchmarkErrorAction,
} = benchmarkSlice.actions;

export default benchmarkSlice.reducer;
