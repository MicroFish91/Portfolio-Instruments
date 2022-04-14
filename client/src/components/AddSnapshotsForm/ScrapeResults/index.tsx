import React, { useEffect } from "react";
import { HoldingForm } from "../../../validation/types";
import ScrapeResult from "./ScrapeResult";
import "./ScrapeResults.css";
import { scrapeYahooFinance } from "./scrapeUtils/scrapeYahooFinance";
import { scrapedData } from "./scrapeUtils/types";

interface ScrapeResultsProps {
  addScraped: (scrapedData: scrapedData, setFieldValue: any) => void;
  selectCachedHolding: (holding: HoldingForm, setFieldValue: any) => void;
  holdingCache: HoldingForm[];
  searchParam: string;
  setFieldValue: any;
}

const ScrapeResults: React.FC<ScrapeResultsProps> = ({
  addScraped,
  selectCachedHolding,
  holdingCache,
  searchParam,
  setFieldValue,
}) => {
  useEffect(() => {
    async function handleScrape() {
      const standardizedSearch = searchParam.toUpperCase();
      const searchCriteria = standardizedSearch.slice(
        0,
        standardizedSearch.length - 1
      );
      if (
        standardizedSearch[standardizedSearch.length - 1] === "`" &&
        standardizedSearch[standardizedSearch.length - 2] !== "`" &&
        !holdingCache
          .map((holding) => holding.holdingTicker)
          .includes(searchCriteria)
      ) {
        const result = await scrapeYahooFinance(searchCriteria);
        addScraped(result, setFieldValue);
      }
    }

    handleScrape();
  }, [searchParam]);

  const filteredResults = holdingCache.filter((holding) => {
    return (
      searchParam && holding.holdingTicker.includes(searchParam.toUpperCase())
    );
  });

  return (
    <div className="ScrapeResults">
      <h5>
        <u>Ticker Recommendations</u>
      </h5>
      {filteredResults.map((ticker) => (
        <ScrapeResult
          ticker={ticker}
          setFieldValue={setFieldValue}
          selectCachedHolding={selectCachedHolding}
        />
      ))}
    </div>
  );
};

export default ScrapeResults;
