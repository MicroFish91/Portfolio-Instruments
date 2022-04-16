import React from "react";
import { IncomeTaxFormConverted } from "../../../validation/types";

interface resetOptionsProps {
  setIncomeBreakdown: (ib: Record<string, number>) => void;
  setTaxBreakdown: (tb: IncomeTaxFormConverted | null) => void;
}

const ResetOptions: React.FC<resetOptionsProps> = ({
  setIncomeBreakdown,
  setTaxBreakdown,
}) => {
  const resetAll = () => {
    setTaxBreakdown(null as IncomeTaxFormConverted | null);
  };

  const resetIncomeBreakdown = () => {
    setIncomeBreakdown({} as Record<string, number>);
  };

  return (
    <div>
      <h3 className="card-title">Reset Options:</h3>
      <div className="row">
        <div className="ml-3">
          <button
            className={`btn btn-primary ml-1`}
            onClick={resetIncomeBreakdown}
          >
            Reset Allocations
          </button>
          <button className={`btn btn-primary ml-1`} onClick={resetAll}>
            Reset All
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetOptions;
