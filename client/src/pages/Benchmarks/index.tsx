import React from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import CardBenchmarks from "../../components/CardBenchmarks";
import { PORTFOLIO_BENCHMARKS } from "../../constants/portfolioBenchmarks";

interface BenchmarkProps {}

type BenchmarkParams = {
  benchmarkIndex: string;
};

const Benchmarks: React.FC<BenchmarkProps> = () => {
  const { benchmarkIndex } = useParams<BenchmarkParams>();

  return (
    <>
      {/* Display all cards */}
      {benchmarkIndex === "general" && (
        <div className="card">
          <div className="row">
            <div className="col-md-12 col-lg-12  pl-0 ">
              <div className="card-body p-6 about-con pabout">
                <h2 className="mb-4 font-weight-semibold">
                  <u>General Information</u>
                </h2>
                <p className="leading-normal">
                  Selecting a benchmark portfolio is the first step of the
                  portfolio buildling process. The following lazy portfolios
                  have been hand-selected as good benchmarks against which to
                  tailor your personal portfolio. Review each of the portfolios
                  below and select the one that most aligns with your preferred
                  investing style.{" "}
                </p>

                <p className="leading-normal">
                  To see additional information on each portfolio, click the
                  "View More" button. When you have made a decision, click the
                  "Set Benchmark" button to continue.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {benchmarkIndex === "general" && (
        <div>
          {PORTFOLIO_BENCHMARKS.assetNames.map((_portfolio, index) => {
            return <CardBenchmarks key={uuidv4()} benchmarkIndex={index} />;
          })}
        </div>
      )}

      {/* Display an Individual Card */}
      {benchmarkIndex !== undefined && benchmarkIndex !== "general" ? (
        <div>
          {/* Card Benchmark */}
          {benchmarkIndex && (
            <CardBenchmarks benchmarkIndex={parseInt(benchmarkIndex)} />
          )}
        </div>
      ) : null}
    </>
  );
};

export default Benchmarks;
