import { round } from "mathjs";
import randomstring from "randomstring";
import {
  BENCHMARK_ASSET_BREAKDOWN,
  HOLDING_CATEGORIES,
} from "../../../constants";
import {
  ACCOUNTS_PER_SNAPSHOT,
  EXTRA_HOLDINGS_PER_ACCOUNT,
  NUM_OF_USERS,
  SNAPSHOTS_PER_USER,
} from "./constants";
import { HoldingSeedGenerator } from "./types";

/*
 * Generates (n = NUM_OF_USERS * SNAPSHOTS_PER_USER * ACCOUNTS_PER_SNAPSHOT * (m = variable number of benchmark assets + 3(random) ) )
 * Random tickers are generated using the randomstring library
 * The title is used as the metric for deleting in our down() method later
 * (i.e. delete... {where: { title = deleteTitle })  )
 */
export function generateHoldings() {
  const holdingSeedGenerator: HoldingSeedGenerator = {
    up: [],
    down: [],
  };
  const accountsPerUser = SNAPSHOTS_PER_USER * ACCOUNTS_PER_SNAPSHOT;
  let accountId = 1;
  let category = "";

  for (let userIndex = 0; userIndex < NUM_OF_USERS; userIndex++) {
    let numberOfBenchmarkAssets = Object.keys(
      BENCHMARK_ASSET_BREAKDOWN[userIndex]
    ).length;
    let holdingsPerAccount =
      numberOfBenchmarkAssets + EXTRA_HOLDINGS_PER_ACCOUNT;
    let holdingsPerUser = accountsPerUser * holdingsPerAccount;
    let holdingsPerAccountIndex = 1;

    for (
      let holdingsIndex = 0;
      holdingsIndex < holdingsPerUser;
      holdingsIndex++
    ) {
      // Ensures each benchmark title has at least one asset given to it
      if (holdingsPerAccountIndex <= numberOfBenchmarkAssets - 1) {
        category = Object.keys(BENCHMARK_ASSET_BREAKDOWN[userIndex])[
          holdingsPerAccountIndex - 1
        ];
      } else {
        category =
          HOLDING_CATEGORIES[
            Math.floor(Math.random() * HOLDING_CATEGORIES.length)
          ];
      }

      holdingsPerAccountIndex++;

      if (holdingsPerAccountIndex > holdingsPerAccount) {
        holdingsPerAccountIndex = 1;
      }

      holdingSeedGenerator.up.push({
        title: `Holding ${(userIndex + 1) * (holdingsIndex + 1)} Title`,
        ticker: randomstring.generate({
          length: 4,
          charset: "alphabetic",
          readable: true,
          capitalization: "lowercase",
        }),
        category,
        total: generateTotal(holdingsPerUser, holdingsIndex),
        expenseRatio: Math.floor(Math.random() * 30) / 100,
        accountId,
        variablePortfolio: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      holdingSeedGenerator.down.push(
        `Holding ${(userIndex + 1) * (holdingsIndex + 1)} Title`
      );

      // Increments the ID count when we finish going through each account
      if (
        (holdingsIndex + 1) % holdingsPerAccount === 0 &&
        holdingsIndex + 1 > holdingsPerAccount - 1
      ) {
        accountId++;
      }
    }
  }

  return holdingSeedGenerator;
}

// Generates an increasingly larger net worth amount over time
// Simulates an increasing net worth over time
function generateTotal(holdingsPerUser: number, holdingNumber: number): number {
  const holdingsPerSnapshot = holdingsPerUser / SNAPSHOTS_PER_USER;
  const factor = Math.floor((holdingNumber + 1) / holdingsPerSnapshot) + 1;
  let total = 0;

  while (true) {
    total = round(Math.random() * 7500 * factor, 2);

    // Ensures demo data has more money saved than last the previous snapshot entry
    if (total > round(7500 * (factor - 1), 2) && total > 1000) {
      break;
    }
  }

  return total;
}
