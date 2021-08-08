import { GenericError } from "../api/types";

export interface BenchmarkReducerState {
  benchmarkTitle: string;
  assetTitles: string[];
  assetRatios: number[];
  error: {
    status: string;
    message: string;
  };
  isLoading: boolean;
}

export type BenchmarkError = GenericError;
