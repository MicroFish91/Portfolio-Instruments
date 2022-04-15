import React, { useState } from "react";
import { IncomeTaxFormConverted } from "../../validation/types";
import AllocationForm from "./AllocationForm";
import AllocationGraph from "./AllocationGraph";
import { getColors, getLabels, getValues } from "./utils";

interface incomeAllocatorProps {
  taxBreakdown: IncomeTaxFormConverted;
}

const IncomeAllocator: React.FC<incomeAllocatorProps> = ({ taxBreakdown }) => {
  const [incomeBreakdown, setIncomeBreakdown] = useState(
    {} as Record<string, number>
  );
  const numberOfFields =
    Object.keys(incomeBreakdown).length + Object.keys(taxBreakdown).length - 1;
  const colors = getColors(numberOfFields);
  const labels = getLabels(incomeBreakdown);
  const allocations = getValues(incomeBreakdown, taxBreakdown);

  console.log(colors);
  console.log(labels);
  console.log(allocations);

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
            biweekly vs monthly vs annually <br />
            reset chart button
          </div>

          {/* Right Column */}
          <div className="col-md-6 col-lg-6">
            <AllocationGraph
              colors={colors}
              labels={labels}
              allocations={allocations}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeAllocator;
