import { GenericError } from "../api/types";

export type custBenchmark = {
  title: string;
  assetTitles: string[];
  assetRatios: number[];
};

// Reducer State
export type CurrentUser = {
  email: string;
  firstName: string;
  lastName: string;
  customBenchmark: custBenchmark[] | null;
  rebalanceThreshold: number;
  vpThreshold: number;
};

export type UserError = GenericError & { email: string };
