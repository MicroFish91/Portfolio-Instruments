import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  selectAssetRebalanceFormat,
  selectBenchmarkTitle,
} from "../../../redux/Benchmarks/Selectors";
import { selectUserRebalanceThreshold } from "../../../redux/User/Selectors";

const AssetRebalance = () => {
  const rebalanceThreshold = useSelector(selectUserRebalanceThreshold);
  const currentBenchmarkTitle = useSelector(selectBenchmarkTitle);

  const [formattedAssets, rebalanceRequired] = useSelector(
    selectAssetRebalanceFormat
  );

  const renderRows = () => {
    return formattedAssets.assetTitles.map((assetTitle, index) => {
      return (
        <tr key={uuidv4()}>
          <th className="wd-25p">{assetTitle}</th>
          <th className="wd-25p">{`${
            formattedAssets.currentAllocation.formattedTotal[index]
          } (${formattedAssets.currentAllocation.percent[index].toFixed(
            2
          )}%)`}</th>
          <th className="wd-25p">{`${
            formattedAssets.adjusted.formattedTotal[index]
          } (${formattedAssets.adjusted.percent[index].toFixed(2)}%)`}</th>
          <th className="wd-25p">{`${
            formattedAssets.goalAllocation.formattedTotal[index]
          } (${formattedAssets.goalAllocation.percent[index].toFixed(
            2
          )}%)`}</th>
        </tr>
      );
    });
  };

  return (
    <>
      <form className="card px-2">
        <div className="card-header">
          <h3 className="card-title">Benchmark Asset Rebalance Results</h3>
        </div>

        <div className="card-body">
          <div className="row px-3">
            <div>
              <p>
                {" "}
                <b>
                  <u>Info:</u>
                </b>{" "}
                Portfolio rebalancing is used to assess the current balance of
                investments in a portfolio, ensuring that the portfolio stays in
                accordance with the original target risk/reward ratio. Your
                current benchmark is "{currentBenchmarkTitle}".
              </p>
              <p>
                {" "}
                <b>
                  <u>Verdict:</u>
                </b>{" "}
                Based on your{" "}
                <b>
                  <u>{rebalanceThreshold}%</u>
                </b>{" "}
                rebalance band,{" "}
                {rebalanceRequired ? (
                  <u>your portfolio needs to be rebalanced.</u>
                ) : (
                  <u>your portfolio does not need to be rebalanced.</u>
                )}
              </p>
              <p>
                <b>
                  <u>Note:</u>
                </b>{" "}
                If you would like to change your rebalance band percentage,
                please go{" "}
                <Link to="/profile">
                  <b>
                    <u>here</u>
                  </b>
                </Link>
                .
              </p>
              <br></br>
            </div>

            <br></br>
            <br></br>
            <br></br>

            <div className="table-responsive">
              <table
                id="example"
                className="table table-striped table-bordered"
                style={{ width: "100%", borderTop: "1px solid grey" }}
              >
                <thead>
                  <tr>
                    <th className="wd-25p">Asset Type</th>
                    <th className="wd-25p">Current Allocation</th>
                    <th className="wd-25p">Potential Adjustment</th>
                    <th className="wd-25p">Goal Allocation</th>
                  </tr>
                </thead>

                <tbody>{renderRows()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AssetRebalance;
