import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectHasBenchmark } from "../../redux/Benchmarks/Selectors";
import { selectHasSnapshots } from "../../redux/Snapshots/Selectors";

const GettingStarted = () => {
  const hasBenchmarks = useSelector(selectHasBenchmark);
  const hasSnapshots = useSelector(selectHasSnapshots);
  const stepOne = hasBenchmarks ? (
    <span>&#10003;</span>
  ) : (
    <span>&nbsp;&nbsp;</span>
  );
  const stepTwo = hasSnapshots ? (
    <span>&#10003;</span>
  ) : (
    <span>&nbsp;&nbsp;</span>
  );

  return (
    <>
      <div className="card">
        <div className="card-status bg-yellow br-tr-3 br-tl-3"></div>
        <div className="card-header">
          <h3 className="card-title">Action Checklist</h3>
        </div>

        <div className="card-body">
          <div className="row px-3">
            <div>
              <p>
                {" "}
                <b>
                  <u>Info:</u>
                </b>{" "}
                Perform the following tasks to get your account setup for use.
              </p>
              <p>
                {" "}
                <b>
                  <u>Background:</u>
                </b>
                This website provides the complete tooling to track and
                rebalance your passive investment strategy. The terms and
                philosophies used here are loosely based off{" "}
                <a
                  href="https://www.investopedia.com/terms/m/modernportfoliotheory.asp"
                  target="_blank"
                >
                  <u>Modern Portfolio Theory (MPT)</u>
                </a>{" "}
                and many of the tools provided are meant to synergize with the
                recommendations and tooling provided by{" "}
                <a href="https://portfoliocharts.com/" target="_blank">
                  <u>Portfolio Charts</u>
                </a>{" "}
                (no affiliation).
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
                    <th className="wd-100p">
                      <Link to="/benchmarks/general">
                        1. Choose a Benchmark Portfolio [{stepOne}]
                      </Link>
                    </th>
                  </tr>
                  <tr>
                    <th className="wd-100p">
                      <Link to="/portfolio-wizard/add-snapshots">
                        2. Add a complete snapshot of your current accounts and
                        holdings [{stepTwo}]
                      </Link>
                    </th>
                  </tr>
                  <tr>
                    <th className="wd-100p">
                      <Link to="/profile">
                        3. Set your rebalance notification thresholds (Optional){" "}
                      </Link>
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GettingStarted;
