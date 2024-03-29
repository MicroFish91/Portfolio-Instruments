import React from "react";
import { Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import {
  clearBenchmarkAction,
  initPostBenchmarkAction,
  initRemoveFromCustomBenchmarkAction,
} from "../../redux/Benchmarks/benchmarkSlice";
import { selectBenchmarkTitle } from "../../redux/Benchmarks/Selectors/selectBenchmarkFields";
import {
  selectUserEmail,
  selectUserFullName,
} from "../../redux/User/Selectors";
import { capitalizeWords } from "../../utils";
import { DEFAULT_COLOR_PALETTE } from "../PieChart/constants";
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

  const dispatch = useDispatch();
  const currentBenchmark = useSelector(selectBenchmarkTitle);
  const username = useSelector(selectUserFullName);
  const userEmail = useSelector(selectUserEmail);

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

  const onDeleteBenchmark = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();

    if (userEmail === "hello_world@gmail.com") {
      alert("This feature is blocked for demo accounts.");
      return;
    }

    if (currentBenchmark === benchmarkTitle) {
      dispatch(clearBenchmarkAction());
    }

    dispatch(initRemoveFromCustomBenchmarkAction(benchmarkTitle));
  };

  const onSetBenchmark = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();

    if (userEmail === "hello_world@gmail.com") {
      alert("This feature is blocked for demo accounts.");
      return;
    }

    dispatch(initPostBenchmarkAction(benchmarkTitle));
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
              {capitalizeWords(benchmarkTitle)}
            </h2>
            <h4 className="leading-normal">
              {benchmarkShortDescription ? (
                benchmarkShortDescription
              ) : (
                <>Custom User Portfolio</>
              )}
            </h4>
            <p className="leading-normal">
              {benchmarkLongDescription ? (
                benchmarkLongDescription
              ) : (
                <>A custom benchmark, created by {username}</>
              )}
              <br></br> <br></br>
              <b>
                <u>Real CAGR</u>
              </b>
              : {benchmarkCAGR}
              {benchmarkCAGR && <>%</>}
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
              {benchmarkWorstDrawdown && <>%</>}
              <br></br>
              <b>
                <u>Longest Drawdown</u>
              </b>
              : {benchmarkLongestDrawdown}{" "}
              {benchmarkLongestDrawdown && <>years</>}
              <br></br>{" "}
            </p>
            <a
              href=""
              className="btn btn-indigo btn-lg mt-2"
              onClick={onSetBenchmark}
            >
              {currentBenchmark === benchmarkTitle && <span>&#10003;</span>} Set
              Benchmark
            </a>
            &nbsp;&nbsp;
            <a
              href=""
              className="btn btn-indigo btn-lg mt-2"
              onClick={onDeleteBenchmark}
            >
              Delete Benchmark
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomBenchmark;
