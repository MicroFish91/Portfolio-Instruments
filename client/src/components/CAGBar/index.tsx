// import "chartjs-plugin-annotation";
import React from "react";
import { Bar } from "react-chartjs-2";
import { CagFormConverted } from "../../validation/types";
import {
  buildBarData,
  getSWRBreakdown,
  getYearlyProjectionData,
  STD_BAR_OPTIONS,
} from "./utils";

interface CAGBarProps {
  growthSettings: CagFormConverted;
}

const CAGBar: React.FC<CAGBarProps> = ({ growthSettings }) => {
  const {
    annualExpenses: ae,
    annualInflation: ai,
    numberOfYears: t,
    safeWithdrawalRate: swr,
  } = growthSettings;

  const swrData = getSWRBreakdown(ae, ai, swr, t);
  const [xAxis, lBounds, mBounds, hBounds] =
    getYearlyProjectionData(growthSettings);

  const data = buildBarData(xAxis, swrData, lBounds, mBounds, hBounds);

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Projected Portfolio Growth</h3>
      </div>
      <div className="card-body">
        <Bar options={STD_BAR_OPTIONS} data={data} />
      </div>
    </div>
  );
};

export default CAGBar;
