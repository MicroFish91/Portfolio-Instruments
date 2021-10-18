import { YAHOO_FINANCE_URL } from "./constants";

export const scrapeYahooFinance = (ticker: string): any => {
  return new Promise(async (_res, _rej) => {
    const scrapedPageResponse = await fetch(`${YAHOO_FINANCE_URL}/${ticker}`);
    const scrapedPageText = await scrapedPageResponse.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(scrapedPageText, "text/html");
    console.log(doc);
  });
};
