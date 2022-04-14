import React from "react";
import { HoldingForm } from "../../../../validation/types";
import "./ScrapeResult.css";

interface scrapeResultProps {
  selectCachedHolding: (holding: HoldingForm, setFieldValue: any) => void;
  ticker: HoldingForm;
  setFieldValue: any;
}

const ScrapeResult: React.FC<scrapeResultProps> = ({
  selectCachedHolding,
  setFieldValue,
  ticker,
}) => {
  return (
    <div
      className="ScrapeResult"
      onClick={(_e) => selectCachedHolding(ticker, setFieldValue)}
    >
      {`${ticker.holdingTicker}: ${ticker.holdingTitle}`}
    </div>
  );
};

export default ScrapeResult;
