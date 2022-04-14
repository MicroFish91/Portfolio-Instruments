import React from "react";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { v4 as uuidv4 } from "uuid";
import BenchmarkBuilder from "../../components/BenchmarkBuilder";
import CustomBenchmark from "../../components/CustomBenchmark";
import {
  selectCustomBenchmarks,
  selectIsLoading,
} from "../../redux/Benchmarks/Selectors/selectBenchmarkFields";

interface CustomBenchmarkProps {}

const CustomBenchmarks: React.FC<CustomBenchmarkProps> = () => {
  const customBenchmarks = useSelector(selectCustomBenchmarks);
  const benchmarkIsLoading = useSelector(selectIsLoading);

  return (
    <>
      <div className="card">
        <div className="row">
          <div className="col-md-12 col-lg-12">
            <div className="card card-body p-6 about-con pabout">
              <h2 className="mb-4 font-weight-semibold">
                <u>Custom Benchmarks</u>
              </h2>
              <p className="leading-normal">
                Selecting a benchmark portfolio is the first step of the
                portfolio building process. You may use this page to customize
                your own portfolio benchmarks.
              </p>
              <p className="leading-normal">
                Portfolio benchmarks that you have previously customized will be
                listed here for you to select.
              </p>
            </div>
          </div>
        </div>
      </div>

      <BenchmarkBuilder />

      {benchmarkIsLoading && (
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ClipLoader size={180} color="purple" />
          </div>
        </>
      )}

      {!benchmarkIsLoading &&
        customBenchmarks &&
        Object.keys(customBenchmarks).map((benchmark) => {
          return (
            <CustomBenchmark
              key={uuidv4()}
              benchmarkTitle={benchmark}
              customBenchmark={customBenchmarks[benchmark]}
            />
          );
        })}
    </>
  );
};

export default CustomBenchmarks;
