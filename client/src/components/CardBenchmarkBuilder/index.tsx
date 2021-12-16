import React, { useState } from "react";
import { CustomBenchmarkForm } from "../../validation/types";
import BenchmarkBuilderPie from "./BenchmarkBuilderPie";
import BenchmarkBuilderTable from "./BenchmarkBuilderTable";

interface createCustomBenchmarkProps {}

const CreateCustomBenchmark: React.FC<createCustomBenchmarkProps> = ({}) => {
  const [assetCategories, setAssetCategories] = useState([] as string[]);
  const [assetPercentages, setAssetPercentages] = useState([] as number[]);

  const addAsset = (values: CustomBenchmarkForm) => {
    setAssetCategories([...assetCategories, values.assetCategory]);
    setAssetPercentages([
      ...assetPercentages,
      parseInt(values.assetPercentage),
    ]);
  };

  console.log(assetCategories);
  console.log(assetPercentages);

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Benchmark Builder</h3>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6 col-lg-6">
            <BenchmarkBuilderTable addAsset={addAsset} />
          </div>
          <div className="col-md-6 col-lg-6">
            <BenchmarkBuilderPie
              assetCategories={assetCategories}
              assetPercentages={assetPercentages}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCustomBenchmark;
