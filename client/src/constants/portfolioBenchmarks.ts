import { ASSET_CODE } from "./";

interface PortfolioBenchmarks {
  assetNames: string[];
  assetTitles: string[][];
  assetRatios: number[][];
  assetSubtitles: string[];
  assetDescriptions: string[];
  assetCAGR: string[];
  assetSTD: string[];
  assetWorstDraw: string[];
  assetLongestDraw: string[];
  linkTo: string[];
  colors: string[][];
  externalUrl: string[];
}

const PORTFOLIO_BENCHMARKS: PortfolioBenchmarks = {} as PortfolioBenchmarks;

PORTFOLIO_BENCHMARKS.assetNames = [
  "Classic 60/40",
  "Three-Fund Portfolio",
  "No-Brainer Portfolio",
  "Rick Ferri Core Four",
  "Ivy Portfolio",
  "Permanent Portfolio",
  "Golden Butterfly",
];

PORTFOLIO_BENCHMARKS.assetTitles = [
  [ASSET_CODE.TSM, ASSET_CODE.ITB],
  [ASSET_CODE.DLCB, ASSET_CODE.ILCB, ASSET_CODE.ITB],
  [ASSET_CODE.DLCB, ASSET_CODE.DSCB, ASSET_CODE.ILCB, ASSET_CODE.STB],
  [ASSET_CODE.DLCB, ASSET_CODE.ILCB, ASSET_CODE.ITB, ASSET_CODE.REITS],
  [
    ASSET_CODE.DLCB,
    ASSET_CODE.ILCB,
    ASSET_CODE.ITB,
    ASSET_CODE.COMMODITIES,
    ASSET_CODE.REITS,
  ],
  [ASSET_CODE.DLCB, ASSET_CODE.LTB, ASSET_CODE.GOLD, ASSET_CODE.CASH],
  [
    ASSET_CODE.DLCB,
    ASSET_CODE.DSCV,
    ASSET_CODE.LTB,
    ASSET_CODE.STB,
    ASSET_CODE.GOLD,
  ],
];

PORTFOLIO_BENCHMARKS.assetRatios = [
  [60, 40],
  [40, 20, 40],
  [25, 25, 25, 25],
  [48, 24, 20, 8],
  [20, 20, 20, 20, 20],
  [25, 25, 25, 25],
  [20, 20, 20, 20, 20],
];

PORTFOLIO_BENCHMARKS.assetSubtitles = [
  "Standard Bogleheads Portfolio",
  "Three-Part Bogleheads Portfolio",
  "A Simple Four-Fund Portfolio",
  "Four-Asset Style Bogleheads Portfolio",
  "Harvard & Yale Endowment Strategy",
  "A Simple, Unconventional All-Weather Portfolio",
  "A Stable & High-Return Portfolio.",
];

PORTFOLIO_BENCHMARKS.assetDescriptions = [
  "A standard Bogleheads classic popularized by Jack Bogle, founder of Vanguard Corp.",
  "Another classically simple but popular Bogleheads portfolio.",
  "A simple but effective portfolio popularized by William Bernstein.",
  "A Bogleheads style portfolio popularized by Rick Ferri.",
  "A portfolio popularized by Mebane Faber detailing the investing strategies of Harvard & Yale Endowments.",
  "An all-weather portfolio popularized by Harry Browne.",
  "An unconventional, stable, & high return portfolio popularized by Portfolio Charts.",
];

PORTFOLIO_BENCHMARKS.assetCAGR = [
  "5.9%",
  "5.9%",
  "6.6%",
  "6.9%",
  "6.6%",
  "5.0%",
  "6.5%",
];

PORTFOLIO_BENCHMARKS.assetSTD = [
  "10.8%",
  "10.6",
  "13.0%",
  "13.1%",
  "10.6%",
  "6.9%",
  "7.8%",
];

PORTFOLIO_BENCHMARKS.assetWorstDraw = [
  "34%",
  "32%",
  "39%",
  "39%",
  "33%",
  "14%",
  "11%",
];

PORTFOLIO_BENCHMARKS.assetLongestDraw = [
  "12 years",
  "10 years",
  "9 years",
  "10 years",
  "5 years",
  "5 years",
  "2 years",
];

PORTFOLIO_BENCHMARKS.linkTo = [
  "/benchmarks/0",
  "/benchmarks/1",
  "/benchmarks/2",
  "/benchmarks/3",
  "/benchmarks/4",
  "/benchmarks/5",
  "/benchmarks/6",
];

PORTFOLIO_BENCHMARKS.colors = [
  ["#f66d9b", "#8ecf4d"],
  ["#f66d9b", "#8ecf4d", "#4ecc48"],
  ["#f66d9b", "#8ecf4d", "#4ecc48", "#f999b9"],
  ["#f66d9b", "#8ecf4d", "#4ecc48", "#f999b9"],
  ["#f66d9b", "#8ecf4d", "#4ecc48", "#f999b9", "#5797fc"],
  ["#f66d9b", "#8ecf4d", "#4ecc48", "#f999b9"],
  ["#f66d9b", "#8ecf4d", "#4ecc48", "#f999b9", "#5797fc"],
];

PORTFOLIO_BENCHMARKS.externalUrl = [
  "https://portfoliocharts.com/portfolio/classic-60-40/",
  "https://portfoliocharts.com/portfolio/three-fund-portfolio/",
  "https://portfoliocharts.com/portfolio/no-brainer-portfolio/",
  "https://portfoliocharts.com/portfolio/rick-ferri-core-four/",
  "https://portfoliocharts.com/portfolio/ivy-portfolio/",
  "https://portfoliocharts.com/portfolio/permanent-portfolio/",
  "https://portfoliocharts.com/portfolio/golden-butterfly/",
];

export { PORTFOLIO_BENCHMARKS };
