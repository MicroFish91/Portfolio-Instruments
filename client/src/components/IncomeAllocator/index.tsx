import React, { useState } from "react";
import { IncomeTaxFormConverted } from "../../validation/types";
import AllocationForm from "./AllocationForm";
import AllocationGraph from "./AllocationGraph";
import IntervalSizeForm from "./IntervalSizeForm";
import ResetOptions from "./ResetOptions";
import { IntervalSize } from "./types";
import { getColors, getLabels, getNormalized, getValues } from "./utils";

interface incomeAllocatorProps {
  taxBreakdown: IncomeTaxFormConverted;
  setTaxBreakdown: (tb: IncomeTaxFormConverted | null) => void;
}

const IncomeAllocator: React.FC<incomeAllocatorProps> = ({
  taxBreakdown,
  setTaxBreakdown,
}) => {
  const [intervalSize, setIntervalSize] = useState(1 as IntervalSize);
  const [incomeBreakdown, setIncomeBreakdown] = useState(
    {} as Record<string, number>
  );
  const numberOfFields =
    Object.keys(incomeBreakdown).length + Object.keys(taxBreakdown).length - 1;
  const colors = getColors(numberOfFields);
  const labels = getLabels(incomeBreakdown);
  const allocations = getValues(incomeBreakdown, taxBreakdown);
  const normalizedAllocations = getNormalized(allocations, intervalSize);

  console.log("Tax Breakdown: ", taxBreakdown);
  console.log("Income Breakdown: ", incomeBreakdown);

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Income Allocator</h3>
      </div>
      <div className="card-body">
        <div className="row">
          {/* Left Column */}
          <div className="col-md-6 col-lg-6">
            <AllocationForm
              allocations={allocations}
              grossLimit={taxBreakdown.grossPay}
              incomeBreakdown={incomeBreakdown}
              setIncomeBreakdown={setIncomeBreakdown}
            />
            <br />
            <br />
            <IntervalSizeForm setIntervalSize={setIntervalSize} />
            <br />
            <br />
            <ResetOptions
              setIncomeBreakdown={setIncomeBreakdown}
              setTaxBreakdown={setTaxBreakdown}
            />
          </div>

          {/* Right Column */}
          <div className="col-md-6 col-lg-6">
            <AllocationGraph
              colors={colors}
              labels={labels}
              allocations={normalizedAllocations}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeAllocator;
