export const ACCOUNT_TYPES = ["Traditional", "Roth", "Taxable"];

export const HOLDING_CATEGORIES = [
  "tsm",
  "dlcb",
  "dlcv",
  "dlcg",
  "dmcb",
  "dmcv",
  "dmcg",
  "dscb",
  "dscv",
  "dscg",
  "ilcb",
  "ilcv",
  "ilcg",
  "imcb",
  "imcv",
  "imcg",
  "iscb",
  "iscv",
  "iscg",
  "ltb",
  "itb",
  "stb",
  "mm",
  "bills",
  "commodoties",
  "gold",
  "reits",
];

export const PORTFOLIO_BENCHMARKS = [
  "Total Stock Market",
  "Classic 60/40",
  "Three-Fund Portfolio",
  "No-Brainer Portfolio",
  "Rick Ferri Core Four",
  "Ivy Portfolio",
  "Permanent Portfolio",
  "Golden Butterfly",
];

export const BENCHMARK_ASSET_BREAKDOWN = [
  { tsm: 100 },
  {
    tsm: 60,
    itb: 40,
  },
  {
    tsm: 48,
    ilcb: 12,
    itb: 40,
  },
  {
    dlcb: 25,
    dscb: 25,
    ilcb: 25,
    stb: 25,
  },
  {
    tsm: 48,
    ilcb: 24,
    itb: 20,
    reits: 8,
  },
  {
    tsm: 20,
    ilcb: 20,
    itb: 20,
    commodities: 20,
    reits: 20,
  },
  {
    tsm: 25,
    ltb: 25,
    mm: 25,
    gold: 25,
  },
  {
    tsm: 20,
    dscv: 20,
    ltb: 20,
    stb: 20,
    gold: 20,
  },
];
