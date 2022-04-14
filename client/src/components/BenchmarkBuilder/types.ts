export type CustomBenchmark = {
  benchmarkTitle: string;
  benchmarkShortDescription: string;
  benchmarkLongDescription: string;
  benchmarkCAGR: number;
  benchmarkStdDev: number;
  benchmarkWorstDrawdown: number;
  benchmarkLongestDrawdown: number;
  assetCategories: string[];
  assetPercentages: number[];
};
