import yahooFinance from "yahoo-finance2";
import { scrapeData } from "./types";

export const scrapeYahooFinance = (ticker: string): scrapeData | null => {
  return new Promise(async (res, rej) => {
    try {
      const tickerData = await yahooFinance.quoteSummary(ticker, {
        modules: ["defaultKeyStatistics", "price"],
      });

      let expenseRatio;

      if (tickerData.defaultKeyStatistics?.annualReportExpenseRatio) {
        expenseRatio = +(
          tickerData.defaultKeyStatistics?.annualReportExpenseRatio * 100
        ).toFixed(2);
      }

      res({
        holdingTitle: tickerData.price?.shortName,
        holdingTicker: ticker,
        holdingExpenseRatio: expenseRatio,
      });
    } catch (ex) {
      rej(null);
    }
  });
};
