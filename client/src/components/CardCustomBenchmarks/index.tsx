import React from "react";
import { Pie } from "react-chartjs-2";
import { DEFAULT_COLOR_PALETTE } from "../CardPieChart/constants";
import { CustomBenchmarkBreakdown } from "./types";

interface CustomBenchmarkProps {
  benchmarkTitle: string;
  customBenchmark: CustomBenchmarkBreakdown;
}

const CustomBenchmark: React.FC<CustomBenchmarkProps> = ({
  benchmarkTitle,
  customBenchmark,
}) => {
  const {
    assetCategories,
    assetPercentages,
    benchmarkShortDescription,
    benchmarkLongDescription,
    benchmarkCAGR,
    benchmarkStdDev,
    benchmarkWorstDrawdown,
    benchmarkLongestDrawdown,
  } = customBenchmark;

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
            <h4 className="leading-normal">{benchmarkShortDescription}</h4>
            <p className="leading-normal">
              {benchmarkLongDescription}
              <br></br> <br></br>
              <b>
                <u>Real CAGR</u>
              </b>
              : {benchmarkCAGR}
              <br></br>
              <b>
                <u>Std. Dev.</u>
              </b>
              : {benchmarkStdDev}
              <br></br>
              <b>
                <u>Worst Drawdown</u>
              </b>
              : {benchmarkWorstDrawdown}
              <br></br>
              <b>
                <u>Longest Drawdown</u>
              </b>
              : {benchmarkLongestDrawdown}
              <br></br>{" "}
            </p>
            <a href="" className="btn btn-indigo btn-lg mt-2">
              Set Benchmark
            </a>
            &nbsp;&nbsp;
            <a href="" className="btn btn-indigo btn-lg mt-2">
              Delete Benchmark
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomBenchmark;
