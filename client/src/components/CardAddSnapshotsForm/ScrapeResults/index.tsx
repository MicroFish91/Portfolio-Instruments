import React, { useEffect } from "react";
import { HoldingForm } from "../../../validation/types";
import ScrapeResult from "./scrapeResult";
import "./ScrapeResults.css";
import { scrapeYahooFinance } from "./scrapeUtils/scrapeYahooFinance";

interface ScrapeResultsProps {
  searchParam: string;
  holdingCache: HoldingForm[];
}

const ScrapeResults: React.FC<ScrapeResultsProps> = ({
  searchParam,
  holdingCache,
}) => {
  useEffect(() => {
    async function handleScrape() {
      const searchCriteria = searchParam
        .slice(0, searchParam.length - 1)
        .toUpperCase();
      if (
        searchParam[searchParam.length - 1] === "`" &&
        !holdingCache
          .map((holding) => holding.holdingTicker)
          .includes(searchCriteria)
      ) {
        const result = await scrapeYahooFinance(searchCriteria);
        console.log(result);
      }
    }

    handleScrape();
  }, [searchParam]);

  const filteredResults = holdingCache.filter((holding) => {
    return searchParam && holding.holdingTicker.includes(searchParam);
  });

  return (
    <div className="ScrapeResults">
      {filteredResults.map((ticker) => (
        <ScrapeResult ticker={ticker} />
      ))}
    </div>
  );
};

export default ScrapeResults;
