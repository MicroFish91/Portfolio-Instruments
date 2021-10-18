import React from "react";
import { HoldingForm } from "../../../validation/types";
import "./ScrapeResult.css";

interface scrapeResultProps {
  ticker: HoldingForm;
}

const ScrapeResult: React.FC<scrapeResultProps> = ({ ticker }) => {
  return (
    <div className="ScrapeResult">
      {`${ticker.holdingTicker}: ${ticker.holdingTitle}`}
    </div>
  );
};

export default ScrapeResult;
