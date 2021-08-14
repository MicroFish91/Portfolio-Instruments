import {
  OutgoingAccount,
  OutgoingHolding,
  OutgoingSnapshot,
  OutgoingSnapshotRaw,
} from "../../types";

// Placeholder
export const toServer = (clientAction: {
  type: string;
  payload: OutgoingSnapshotRaw;
}): OutgoingSnapshot => {
  const clientSnapshot = clientAction.payload;
  const formattedSnapshot: OutgoingSnapshot = {
    title: clientSnapshot.snapshotTitle,
    benchmark: clientSnapshot.snapshotBenchmark,
    notes: clientSnapshot.snapshotNotes,
    specifiedDate: clientSnapshot.snapshotDate,
    accounts: [],
  };
  const accountTypes = ["traditional", "roth", "taxable"];

  clientSnapshot.accounts.forEach((accountInstitution) => {
    accountTypes.forEach((typeKey) => {
      if (accountInstitution.accountType[typeKey].length) {
        const formattedAccount: OutgoingAccount = {
          location: accountInstitution.accountName,
          type: typeKey[0].toUpperCase() + typeKey.slice(1),
          holdings: [],
        };
        accountInstitution.accountType[typeKey].forEach((holding) => {
          const formattedHolding: OutgoingHolding = {
            title: holding.holdingTitle,
            ticker: holding.holdingTicker,
            category: holding.assetType,
            expenseRatio: holding.holdingExpenseRatio,
            total: holding.holdingAmount,
          };
          formattedAccount.holdings.push(formattedHolding);
        });
        formattedSnapshot.accounts.push(formattedAccount);
      }
    });
  });

  console.log("Formatted", formattedSnapshot);

  return formattedSnapshot;
};
