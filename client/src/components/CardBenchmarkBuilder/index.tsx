import React, { useState } from "react";
import { CustomBenchmarkForm } from "../../validation/types";
import BenchmarkBuilderForm from "./BenchmarkBuilderForm";
import BenchmarkBuilderPie from "./BenchmarkBuilderPie";
import BenchmarkBuilderTable from "./BenchmarkBuilderTable";

interface createCustomBenchmarkProps {}

const CreateCustomBenchmark: React.FC<createCustomBenchmarkProps> = ({}) => {
  const [assetAllocation, setAssetAllocation] = useState({
    unallocated: 100,
  } as { [key: string]: number });

  const addAsset = (values: CustomBenchmarkForm) => {
    const newAssetAllocation = { ...assetAllocation };
    newAssetAllocation["unallocated"] =
      newAssetAllocation["unallocated"] +
      (newAssetAllocation[values.assetCategory] || 0) -
      parseInt(values.assetPercentage);
    newAssetAllocation[values.assetCategory] = parseInt(values.assetPercentage);
    setAssetAllocation(newAssetAllocation);
  };

  const resetAssets = () => {
    setAssetAllocation({
      unallocated: 100,
    });
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Benchmark Builder</h3>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6 col-lg-6">
            <BenchmarkBuilderForm addAsset={addAsset} />
            <br /> <br />
            <BenchmarkBuilderTable
              assetAllocation={assetAllocation}
              resetAssets={resetAssets}
            />
          </div>
          <div className="col-md-6 col-lg-6">
            <BenchmarkBuilderPie
              assetCategories={Object.keys(assetAllocation)}
              assetPercentages={Object.values(assetAllocation)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCustomBenchmark;
