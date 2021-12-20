import { GenericError } from "../api/types";

export type FormattedAssets = {
  assetTitles: string[];
  currentAllocation: {
    total: number[];
    formattedTotal: string[];
    percent: number[];
  };
  adjusted: {
    total: number[];
    formattedTotal: string[];
    percent: number[];
  };
  goalAllocation: {
    total: number[];
    formattedTotal: string[];
    percent: number[];
  };
};

export type FormattedMacros = {
  macroTitles: string[];
  currentAllocation: {
    total: number[];
    formattedTotal: string[];
    percent: number[];
  };
  adjusted: {
    total: number[];
    formattedTotal: string[];
    percent: number[];
  };
  goalAllocation: {
    total: number[];
    formattedTotal: string[];
    percent: number[];
  };
};

export type FormattedAccounts = {
  accountTitles: string[];
  currentAllocation: {
    total: number[];
    formattedTotal: string[];
    percent: number[];
  };
  adjusted: {
    total: number[];
    formattedTotal: string[];
    percent: number[];
  };
  goalAllocation: {
    total: number[];
    formattedTotal: string[];
    percent: number[];
  };
};

export interface BenchmarkReducerState {
  benchmarkTitle: string;
  assetTitles: string[];
  assetRatios: number[];
  customBenchmark: CustomBenchmarkMap | null;
  error: {
    status: string;
    message: string;
  };
  isLoading: boolean;
}

export interface CustomBenchmarkForm {
  benchmarkTitle: string;
  assetCategory: string[];
  assetPercentages: number[];
  benchmarkShortDescription: string | null;
  benchmarkLongDescription: string | null;
  benchmarkCAGR: string | null;
  benchmarkStdDev: string | null;
  benchmarkWorstDrawdown: string | null;
  benchmarkLongestDrawdown: string | null;
}

export interface CustomBenchmark {
  assetCategories: string[];
  assetPercentages: number[];
  benchmarkShortDescription: string | null;
  benchmarkLongDescription: string | null;
  benchmarkCAGR: number | null;
  benchmarkStdDev: number | null;
  benchmarkWorstDrawdown: number | null;
  benchmarkLongestDrawdown: number | null;
}

export interface CustomBenchmarkMap {
  [benchmarkTitle: string]: CustomBenchmark;
}

export type BenchmarkError = GenericError;
export type AssetRebalanceGeneratorResults = [FormattedAssets, boolean];
export type VpRebalanceGeneratorResults = [FormattedMacros, boolean];
export type AccountRebalanceGeneratorResults = FormattedAccounts;
