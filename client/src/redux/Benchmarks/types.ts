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
  error: {
    status: string;
    message: string;
  };
  isLoading: boolean;
}

export type BenchmarkError = GenericError;
export type AssetRebalanceGeneratorResults = [FormattedAssets, boolean];
export type VpRebalanceGeneratorResults = [FormattedMacros, boolean];
export type AccountRebalanceGeneratorResults = FormattedAccounts;
