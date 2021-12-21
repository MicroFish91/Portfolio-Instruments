export type CustomBenchmarkBreakdown = {
  benchmarkShortDescription: string | null;
  benchmarkLongDescription: string | null;
  benchmarkCAGR: number | null;
  benchmarkStdDev: number | null;
  benchmarkWorstDrawdown: number | null;
  benchmarkLongestDrawdown: number | null;
  assetCategories: string[];
  assetPercentages: number[];
};
