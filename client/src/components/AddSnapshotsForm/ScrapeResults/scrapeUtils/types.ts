export type scrapeData = Promise<{
  holdingTitle: string | null | undefined;
  holdingTicker: string;
  holdingExpenseRatio: number | null | undefined;
}>;

export type scrapedData = {
  holdingTitle: string | null | undefined;
  holdingTicker: string;
  holdingExpenseRatio: number | null | undefined;
} | null;
