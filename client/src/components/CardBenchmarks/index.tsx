import React from "react";
import { Pie } from "react-chartjs-2";
import PORTFOLIO_BENCHMARKS from "../../pages/Benchmarks/constants";

interface BenchmarkProps {
  benchmarkIndex: number;
}

const Benchmark: React.FC<BenchmarkProps> = ({ benchmarkIndex }) => {
  const data = {
    labels: PORTFOLIO_BENCHMARKS.assetTitles[benchmarkIndex],
    datasets: [
      {
        data: PORTFOLIO_BENCHMARKS.assetRatios[benchmarkIndex],
        backgroundColor: PORTFOLIO_BENCHMARKS.colors[benchmarkIndex],
        hoverBackgroundColor: PORTFOLIO_BENCHMARKS.colors[benchmarkIndex],
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
            <h2 className="mb-4 font-weight-semibold">
              {PORTFOLIO_BENCHMARKS.assetNames[benchmarkIndex]}
            </h2>
            <h4 className="leading-normal">
              {PORTFOLIO_BENCHMARKS.assetSubtitles[benchmarkIndex]}
            </h4>
            <p className="leading-normal">
              {PORTFOLIO_BENCHMARKS.assetDescriptions[benchmarkIndex]}
              <br></br> <br></br>
              <b>
                <u>Real CAGR</u>
              </b>
              : {PORTFOLIO_BENCHMARKS.assetCAGR[benchmarkIndex]}
              <br></br>
              <b>
                <u>Std. Dev.</u>
              </b>
              : {PORTFOLIO_BENCHMARKS.assetSTD[benchmarkIndex]}
              <br></br>
              <b>
                <u>Worst Drawdown</u>
              </b>
              : {PORTFOLIO_BENCHMARKS.assetWorstDraw[benchmarkIndex]}
              <br></br>
              <b>
                <u>Longest Drawdown</u>
              </b>
              : {PORTFOLIO_BENCHMARKS.assetLongestDraw[benchmarkIndex]}
              <br></br>{" "}
            </p>
            <a href="" className="btn btn-indigo btn-lg mt-2">
              View More
            </a>
            &nbsp;&nbsp;
            <a
              href=""
              className="btn btn-indigo btn-lg mt-2"
              // onClick={(e) => {
              //   e.preventDefault();
              //   this.props.onSetBenchmark(
              //     localStorage.getItem("user"),
              //     this.props.assetInfo.assetNames[this.props.index]
              //   );
              // }}
            >
              Set Benchmark
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benchmark;
