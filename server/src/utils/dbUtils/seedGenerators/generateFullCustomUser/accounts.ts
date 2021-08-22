import { AccountSeed } from "../types";

export const DEFAULT_ACCOUNTS: AccountSeed[] = [
  {
    location: "Bank of America",
    type: "Taxable",
    snapshotId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    location: "Chase",
    type: "Taxable",
    snapshotId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    location: "Citi",
    type: "Taxable",
    snapshotId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    location: "Fidelity",
    type: "Roth",
    snapshotId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    location: "Fidelity",
    type: "Taxable",
    snapshotId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    location: "HSA Bank",
    type: "Traditional",
    snapshotId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    location: "Robinhood",
    type: "Taxable",
    snapshotId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    location: "Schwab",
    type: "Traditional",
    snapshotId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    location: "Vanguard",
    type: "Traditional",
    snapshotId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    location: "Vanguard",
    type: "Roth",
    snapshotId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    location: "Vanguard",
    type: "Taxable",
    snapshotId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const generateCustomAccounts = (
  snapshotIds: number[]
): AccountSeed[] => {
  const snapshotAccounts: AccountSeed[] = [];

  for (let snapshotIndex = 0; snapshotIndex < 5; snapshotIndex++) {
    snapshotAccounts.push(
      ...DEFAULT_ACCOUNTS.map((account) => {
        const newAccount = {
          ...account,
          snapshotId: snapshotIds[snapshotIndex],
        };
        return newAccount;
      })
    );
  }

  return snapshotAccounts;
};
