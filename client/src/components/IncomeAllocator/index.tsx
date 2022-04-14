import React from "react";
import GraphBreakdown from "./GraphBreakdown";

interface incomeAllocatorProps {}

const IncomeAllocator: React.FC<incomeAllocatorProps> = ({}) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Income Allocator</h3>
      </div>
      <div className="card-body">
        <div className="row">
          {/* Left Column */}
          <div className="col-md-6 col-lg-6">Form</div>

          {/* Right Column */}
          <div className="col-md-6 col-lg-6">
            <GraphBreakdown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeAllocator;
