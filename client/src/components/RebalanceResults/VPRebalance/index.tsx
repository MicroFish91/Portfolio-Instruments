import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUserVpThreshold } from "../../../redux/User/userSelectors";

const VPRebalance = () => {
  const vpThreshold = useSelector(selectUserVpThreshold);

  return (
    <>
      <form className="card px-2">
        <div className="card-header">
          <h3 className="card-title">Variable Portfolio Rebalance Results</h3>
        </div>

        <div className="card-body">
          <div className="row px-3">
            <div>
              <p>
                <b>
                  <u>Info:</u>
                </b>{" "}
                Your variable portfolio makes up a small portion of assets that
                are not tracked against any benchmark. Here we analyze whether
                or not you are within the proper macro boundaries that you have
                set for yourself.
              </p>
              <p>
                <b>
                  <u>Verdict:</u>
                </b>{" "}
                Based on your{" "}
                <b>
                  <u>{vpThreshold}</u>
                </b>
                % variable portfolio rebalance band,{" "}
                <u>your portfolio needs to be rebalanced.</u>
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
                    <th className="wd-20p">Macro Allocation</th>
                    <th className="wd-20p">Current Allocation</th>
                    <th className="wd-20p">Potential Adjustment</th>
                    <th className="wd-20p">Goal Allocation</th>
                  </tr>
                </thead>

                <tbody></tbody>
              </table>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default VPRebalance;
