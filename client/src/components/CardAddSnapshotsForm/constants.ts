import { ASSET_CODE, ASSET_DESCRIPTION } from "../../constants";

export const selectAccountTypeMap = {
  value: ["Taxable", "Roth", "Traditional"],
  display: ["Taxable", "Roth", "Traditional"],
};

export const selectAssetTypeMap = {
  value: Object.values(ASSET_CODE),
  display: Object.values(ASSET_DESCRIPTION),
};
