import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { initPostCustomBenchmarkAction } from "../../redux/Benchmarks/benchmarkSlice";
import {
  CustomBenchmarkAssetsForm,
  CustomBenchmarkForm,
  CustomBenchmarkFormConverted,
} from "../../validation/types";
import BenchmarkBuilderForm from "./BenchmarkBuilderForm";
import BenchmarkBuilderPie from "./BenchmarkBuilderPie";
import BenchmarkBuilderTable from "./BenchmarkBuilderTable";

interface createCustomBenchmarkProps {}

const CreateCustomBenchmark: React.FC<createCustomBenchmarkProps> = ({}) => {
  const [assetAllocation, setAssetAllocation] = useState({
    unallocated: 100,
  } as { [key: string]: number });
  const dispatch = useDispatch();

  const addAsset = (values: CustomBenchmarkAssetsForm) => {
    const newAssetAllocation = { ...assetAllocation };
    newAssetAllocation["unallocated"] =
      newAssetAllocation["unallocated"] +
      (newAssetAllocation[values.assetCategory] || 0) -
      parseInt(values.assetPercentage);
    newAssetAllocation[values.assetCategory] = parseInt(values.assetPercentage);
    setAssetAllocation(newAssetAllocation);
  };

  const deleteAsset = (
    _e: React.MouseEvent<HTMLElement>,
    assetCategory: string
  ) => {
    const newAssetAllocation = { ...assetAllocation };
    newAssetAllocation["unallocated"] =
      newAssetAllocation["unallocated"] + newAssetAllocation[assetCategory];
    delete newAssetAllocation[assetCategory];
    setAssetAllocation(newAssetAllocation);
  };

  const resetBenchmark = () => {
    setAssetAllocation({
      unallocated: 100,
    });
  };

  const submitBenchmark = (benchmarkForm: CustomBenchmarkForm) => {
    const assetCategories = [] as string[];
    const assetPercentages = [] as number[];
    const finalAllocation: CustomBenchmarkFormConverted = {
      ...benchmarkForm,
      benchmarkCAGR: parseFloat(benchmarkForm.benchmarkCAGR),
      benchmarkStdDev: parseFloat(benchmarkForm.benchmarkStdDev),
      benchmarkWorstDrawdown: parseFloat(benchmarkForm.benchmarkWorstDrawdown),
      benchmarkLongestDrawdown: parseInt(
        benchmarkForm.benchmarkLongestDrawdown
      ),
      assetCategories,
      assetPercentages,
    };

    Object.keys(assetAllocation).forEach((category) => {
      if (category !== "unallocated") {
        assetCategories.push(category);
        assetPercentages.push(assetAllocation[category]);
      }
    });

    dispatch(initPostCustomBenchmarkAction(finalAllocation));

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
              deleteAsset={deleteAsset}
              resetBenchmark={resetBenchmark}
              submitBenchmark={submitBenchmark}
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
