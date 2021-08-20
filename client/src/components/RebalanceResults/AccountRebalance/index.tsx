import { useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { selectAccountRebalanceFormat } from "../../../redux/Benchmarks/Selectors";

const AssetRebalance = () => {
  const [removeIndices, setRemoveIndices] = useState<number[]>([]);
  const accountRebalanceFormat = useSelector(
    selectAccountRebalanceFormat(removeIndices)
  );

  const deleteRow = (index: number) => {
    const newIndices = [...removeIndices];
    newIndices.push(index);
    setRemoveIndices(newIndices);
  };

  const renderRows = () => {
    return accountRebalanceFormat.accountTitles.map((accountTitle, index) => {
      return (
        <tr key={uuidv4()}>
          <th className="wd-25p">{accountTitle}</th>
          <th className="wd-25p">{`${
            accountRebalanceFormat.currentAllocation.formattedTotal[index]
          } (${accountRebalanceFormat.currentAllocation.percent[index].toFixed(
            2
          )}%)`}</th>
          <th className="wd-25p">{`${
            accountRebalanceFormat.adjusted.formattedTotal[index]
          } (${accountRebalanceFormat.adjusted.percent[index].toFixed(
            2
          )}%)`}</th>
          <th className="wd-25p">{`${
            accountRebalanceFormat.goalAllocation.formattedTotal[index]
          } (${accountRebalanceFormat.goalAllocation.percent[index].toFixed(
            2
          )}%)`}</th>
          <td>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a className="icon"></a>
            <a
              href="javascript:void(0)"
              className="btn btn-danger btn-sm"
              onClick={(_e) => deleteRow(index)}
            >
              <i className="fas fa-trash"></i> Ignore{" "}
            </a>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <form className="card px-2">
        <div className="card-header">
          <h3 className="card-title">Account Rebalance Results (Optional)</h3>
        </div>

        <div className="card-body">
          <div className="row px-3">
            <div>
              <p>
                {" "}
                <b>
                  <u>Info:</u>
                </b>{" "}
                Account rebalancing is an optional bonus feature that is
                automatically displayed. If you click on the ignore button for
                an account, the table will rerun the calculations based on only
                the remaining accounts listed. Ignoring an account in this table
                will not make any permanent changes to our records of this
                account.
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
                    <th className="wd-25p">Financial Institution</th>
                    <th className="wd-25p">Current Allocation</th>
                    <th className="wd-25p">Potential Adjustment</th>
                    <th className="wd-25p">Goal Allocation</th>
                    <th className="wd-25p">Ignore</th>
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
