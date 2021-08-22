import { HoldingSeed } from "../types";
import { HOLDINGS_TEMPLATE_PER_SNAPSHOT } from "./holdingData";

export const generateCustomHoldings = (accountIds: number[]): HoldingSeed[] => {
  const holdings: HoldingSeed[] = [];

  accountIds.forEach((accountId, accountIndex) => {
    holdings.push(
      ...HOLDINGS_TEMPLATE_PER_SNAPSHOT[
        accountIndex < 11 ? accountIndex : accountIndex % 11
      ].map((holding) => {
        return {
          ...holding,
          total: holding.total + holding.total * accountIndex * 0.2,
          accountId,
        };
      })
    );
  });

  return holdings;
};
