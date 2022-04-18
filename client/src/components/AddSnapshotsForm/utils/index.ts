import _ from "lodash";
import { selectAssetTypeMap } from "../constants";

export const addStarsToBenchmarks = (
  benchmarkAssets: string[]
): {
  value: string[];
  display: string[];
} => {
  const benchmarkSet = new Set();
  const matchingIndices: number[] = [];
  const assetTypeMap = _.cloneDeep(selectAssetTypeMap);

  benchmarkAssets.forEach((asset) => {
    benchmarkSet.add(asset);
  });

  assetTypeMap.value.forEach((category, idx) => {
    if (benchmarkSet.has(category)) {
      matchingIndices.push(idx);
    }
  });

  matchingIndices.forEach((idx) => {
    assetTypeMap.display[idx] = "*" + assetTypeMap.display[idx];
  });

  return assetTypeMap;
};
