import { createSelector } from "@reduxjs/toolkit";
import { usdFormatter } from "../../../utils";
import { selectTotalsByInstitutions } from "../../Holdings/Selectors/selectCumulativesByInstitution";
import { AccountRebalanceGeneratorResults, FormattedAccounts } from "../types";

export const selectAccountRebalanceFormat = (removeIndices: number[]) => {
  return createSelector(
    selectTotalsByInstitutions,
    (totalsByInstitutionBefore): AccountRebalanceGeneratorResults => {
      const totalsByInstitution = { ...totalsByInstitutionBefore };

      removeIndices.forEach((index) => {
        delete totalsByInstitution[Object.keys(totalsByInstitution)[index]];
      });

      const dollarFormatter = usdFormatter();
      const sumTotal = Object.values(totalsByInstitution).reduce(
        (acc, accTotal) => {
          return acc + accTotal;
        },
        0
      );

      const formattedAssets: FormattedAccounts = {
        accountTitles: Object.keys(totalsByInstitution),
        currentAllocation: {
          total: Object.values(totalsByInstitution),
          formattedTotal: Object.values(totalsByInstitution).map((total) => {
            return dollarFormatter.format(total);
          }),
          percent: Object.values(totalsByInstitution).map((accountTotal) => {
            return (accountTotal / sumTotal) * 100;
          }),
        },
        adjusted: {
          total: [],
          formattedTotal: [],
          percent: [],
        },
        goalAllocation: {
          total: Object.keys(totalsByInstitution).map((_) => {
            return sumTotal / Object.keys(totalsByInstitution).length;
          }),
          formattedTotal: Object.keys(totalsByInstitution).map((_) => {
            return dollarFormatter.format(
              sumTotal / Object.keys(totalsByInstitution).length
            );
          }),
          percent: Object.keys(totalsByInstitution).map((_) => {
            return 100 / Object.keys(totalsByInstitution).length;
          }),
        },
      };

      const adjusted = formattedAssets.adjusted;
      const current = formattedAssets.currentAllocation;
      const goal = formattedAssets.goalAllocation;

      for (let index = 0; index < current.total.length; index++) {
        adjusted.total[index] = goal.total[index] - current.total[index];
        adjusted.percent[index] = goal.percent[index] - current.percent[index];
        adjusted.formattedTotal[index] = dollarFormatter.format(
          adjusted.total[index]
        );
      }

      return formattedAssets;
    }
  );
};
