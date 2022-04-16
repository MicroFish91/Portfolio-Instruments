import React, { useState } from "react";
import { IncomeTaxFormConverted } from "../../validation/types";
import AllocationForm from "./AllocationForm";
import AllocationGraph from "./AllocationGraph";
import IntervalPercentForm from "./IntervalPercentForm";
import IntervalSizeForm from "./IntervalSizeForm";
import ResetOptions from "./ResetOptions";
import { IntervalPercent, IntervalSize } from "./types";
import {
  aftTaxPercents,
  befTaxPercents,
  getColors,
  getLabels,
  getNormalized,
  getValues,
} from "./utils";

interface incomeAllocatorProps {
  taxBreakdown: IncomeTaxFormConverted;
  setTaxBreakdown: (tb: IncomeTaxFormConverted | null) => void;
}

const IncomeAllocator: React.FC<incomeAllocatorProps> = ({
  taxBreakdown,
  setTaxBreakdown,
}) => {
  const [intervalSize, setIntervalSize] = useState(1 as IntervalSize);
  const [percentView, setPercentView] = useState(
    null as IntervalPercent | null
  );
  const [incomeBreakdown, setIncomeBreakdown] = useState(
    {} as Record<string, number>
  );
  const numberOfFields =
    Object.keys(incomeBreakdown).length + Object.keys(taxBreakdown).length - 1;

  const allocations = getValues(incomeBreakdown, taxBreakdown);
  let colors = getColors(numberOfFields);
  let labels = getLabels(incomeBreakdown);

  let normalizedAllocations;

  // Normalize allocations based on user's view settings
  if (percentView === IntervalPercent.After_Tax) {
    normalizedAllocations = aftTaxPercents(allocations, taxBreakdown);
    colors = colors.slice(5);
    labels = labels.slice(5);
  } else if (percentView === IntervalPercent.Before_Tax) {
    normalizedAllocations = befTaxPercents(allocations, taxBreakdown.grossPay);
  } else {
    normalizedAllocations = getNormalized(allocations, intervalSize);
  }

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
            <IntervalPercentForm setPercentView={setPercentView} />
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
