import { HOLDING_CODES } from "../../../../constants";
import { HoldingSeed } from "../types";

export const HOLDINGS_TEMPLATE_PER_SNAPSHOT: HoldingSeed[][] = [
  /*
  * L: "Bank of America"
  * T: "Taxable"
  ? Checking Account
  */
  [
    {
      title: "Bank of America - Checking",
      ticker: "BOACHK",
      category: HOLDING_CODES.CASH,
      total: 14651.95,
      expenseRatio: 0,
      variablePortfolio: false,
      accountId: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],

  /*
  * L: "Chase"
  * T: "Taxable"
  ? Credit Card
  */
  [
    {
      title: "Chase Sapphire - Credit Card",
      ticker: "CC",
      category: HOLDING_CODES.CASH,
      total: -120.85,
      expenseRatio: 0,
      variablePortfolio: false,
      accountId: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],

  /*
  * L: "Citi"
  * T: "Taxable"
  ? Credit Card
  */
  [
    {
      title: "Citi Double Cash - Credit Card",
      ticker: "CC",
      category: HOLDING_CODES.CASH,
      total: -500.25,
      expenseRatio: 0,
      variablePortfolio: false,
      accountId: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],

  /*
  * L: "Fidelity"
  * T: "Roth"
  ? Brokerage
  */
  [
    {
      title: "Fidelity Core Money Market",
      ticker: "FCORE",
      category: HOLDING_CODES.CASH,
      total: 7265.88,
      expenseRatio: 0.01,
      variablePortfolio: false,
      accountId: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "US Treasury Bond",
      ticker: "912350RX8",
      category: HOLDING_CODES.LTB,
      total: 3800.52,
      expenseRatio: 0,
      variablePortfolio: false,
      accountId: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],

  /*
  * L: "Fidelity"
  * T: "Taxable"
  ? Brokerage
  */
  [
    {
      title: "Fidelity Total Market Index Fund",
      ticker: "FSKAX",
      category: HOLDING_CODES.DLCB,
      total: 10050.35,
      expenseRatio: 0.02,
      variablePortfolio: false,
      accountId: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "US Treasury Bond",
      ticker: "957610RX8",
      category: HOLDING_CODES.LTB,
      total: 4050.55,
      expenseRatio: 0,
      variablePortfolio: false,
      accountId: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "SPDR Gold Trust",
      ticker: "GLD",
      category: HOLDING_CODES.GOLD,
      total: 7834.9,
      expenseRatio: 0.4,
      variablePortfolio: false,
      accountId: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Fidelity Core Money Market",
      ticker: "FCORE",
      category: HOLDING_CODES.CASH,
      total: 3500.88,
      expenseRatio: 0.01,
      variablePortfolio: false,
      accountId: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],

  /*
  * L: "HSA Bank"
  * T: "Traditional"
  ? Brokerage
  */
  [
    {
      title: "HSA Core Cash",
      ticker: "HSACASH",
      category: HOLDING_CODES.CASH,
      total: 5500.43,
      expenseRatio: 0.1,
      variablePortfolio: false,
      accountId: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Vanguard Wellington",
      ticker: "VWELX",
      category: HOLDING_CODES.DLCB,
      total: 1500.29,
      expenseRatio: 0.24,
      variablePortfolio: true,
      accountId: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],

  /*
  * L: "Robinhood"
  * T: "Taxable"
  ? Brokerage
  */
  [
    {
      title: "Microsoft Corporation",
      ticker: "MSFT",
      category: HOLDING_CODES.DLCB,
      total: 7200.19,
      expenseRatio: 0.005,
      variablePortfolio: true,
      accountId: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Apple Inc.",
      ticker: "AAPL",
      category: HOLDING_CODES.DLCB,
      total: 4200.29,
      expenseRatio: 0.005,
      variablePortfolio: true,
      accountId: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "IDEX Corp.",
      ticker: "IEX",
      category: HOLDING_CODES.DSCV,
      total: 2900.13,
      expenseRatio: 0.005,
      variablePortfolio: true,
      accountId: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],

  /*
  * L: "Schwab"
  * T: "Traditional"
  ? 401k
  */
  [
    {
      title: "Schwab Cash Core",
      ticker: "SCHCORE",
      category: HOLDING_CODES.CASH,
      total: 9200.55,
      expenseRatio: 0.02,
      variablePortfolio: false,
      accountId: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Schwab Total Stock Market Index Fund",
      ticker: "SWTSX",
      category: HOLDING_CODES.DLCB,
      total: 4450.33,
      expenseRatio: 0.15,
      variablePortfolio: true,
      accountId: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],

  /*
  * L: "Vanguard"
  * T: "Traditional"
  ? Brokerage
  */
  [
    {
      title: "Vanguard Federal Money Market Fund",
      ticker: "VFMMF",
      category: HOLDING_CODES.CASH,
      total: 7500.02,
      expenseRatio: 0.11,
      variablePortfolio: false,
      accountId: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "US Treasury Bond",
      ticker: "957444RX8",
      category: HOLDING_CODES.LTB,
      total: 27500.61,
      expenseRatio: 0,
      variablePortfolio: false,
      accountId: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Ishares Gold Trust",
      ticker: "IAU",
      category: HOLDING_CODES.GOLD,
      total: 8276.48,
      expenseRatio: 0.25,
      variablePortfolio: false,
      accountId: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Vanguard Total Stock Market Index",
      ticker: "VTSAX",
      category: HOLDING_CODES.DLCB,
      total: 17939.28,
      expenseRatio: 0.15,
      variablePortfolio: false,
      accountId: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Vanguard Small-Cap Value Index Fund Admiral Shares",
      ticker: "VSIAX",
      category: HOLDING_CODES.DSCV,
      total: 904.82,
      expenseRatio: 0.07,
      variablePortfolio: true,
      accountId: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],

  /*
  * L: "Vanguard"
  * T: "Roth"
  ? Brokerage
  */
  [
    {
      title: "Vanguard Federal Money Market Fund",
      ticker: "VFMMF",
      category: HOLDING_CODES.CASH,
      total: 12501.02,
      expenseRatio: 0.11,
      variablePortfolio: false,
      accountId: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "US Treasury Bond",
      ticker: "912744RX8",
      category: HOLDING_CODES.LTB,
      total: 4600.61,
      expenseRatio: 0,
      variablePortfolio: false,
      accountId: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Ishares Gold Trust",
      ticker: "IAU",
      category: HOLDING_CODES.GOLD,
      total: 5400.48,
      expenseRatio: 0.25,
      variablePortfolio: false,
      accountId: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],

  /*
  * L: "Vanguard"
  * T: "Taxable"
  ? Brokerage
  */
  [
    {
      title: "Vanguard Federal Money Market Fund",
      ticker: "VFMMF",
      category: HOLDING_CODES.CASH,
      total: 3000.25,
      expenseRatio: 0.11,
      variablePortfolio: false,
      accountId: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "US Treasury Bond",
      ticker: "957444RX8",
      category: HOLDING_CODES.LTB,
      total: 3500.61,
      expenseRatio: 0,
      variablePortfolio: false,
      accountId: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Ishares Gold Trust",
      ticker: "IAU",
      category: HOLDING_CODES.GOLD,
      total: 5834.24,
      expenseRatio: 0.25,
      variablePortfolio: false,
      accountId: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Vanguard Total Stock Market Index",
      ticker: "VTSAX",
      category: HOLDING_CODES.DLCB,
      total: 8744.38,
      expenseRatio: 0.15,
      variablePortfolio: false,
      accountId: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
];
