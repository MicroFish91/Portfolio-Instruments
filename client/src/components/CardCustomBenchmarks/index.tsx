import React from "react";
import { Pie } from "react-chartjs-2";
import { DEFAULT_COLOR_PALETTE } from "../CardPieChart/constants";

interface CustomBenchmarkProps {
  benchmarkTitle: string;
  benchmarkDescription: string;
  assetCategories: string[];
  assetPercentages: number[];
}

const CustomBenchmark: React.FC<CustomBenchmarkProps> = ({
  benchmarkTitle,
  benchmarkDescription,
  assetCategories,
  assetPercentages,
}) => {
  console.log("working");
  const data = {
    labels: assetCategories,
    datasets: [
      {
        data: assetPercentages,
        backgroundColor: DEFAULT_COLOR_PALETTE.slice(assetCategories.length),
        hoverBackgroundColor: DEFAULT_COLOR_PALETTE.slice(
          assetCategories.length
        ),
      },
    ],
  };

  return (
    <div className="card">
      <div className="row">
        <div className="col-md-12 col-lg-6 pr-0 d-none d-lg-block">
          <div className="card">
            <div className="card-body">
              <Pie data={data} />
            </div>
          </div>
        </div>

        <div className="col-md-12 col-lg-6  pl-0 ">
          <div className="card-body p-6 about-con pabout">
            <h2 className="mb-4 font-weight-semibold">{benchmarkTitle}</h2>
            <h4 className="leading-normal">{benchmarkDescription}</h4>
          </div>
        </div>
      </div>
      e
    </div>
  );
};

export default CustomBenchmark;
