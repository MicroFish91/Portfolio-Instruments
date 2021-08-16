import React from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { selectHoldingsBySnapshotId } from "../../../redux/Holdings/holdingSelectors";
import { usdFormatter } from "../../../utils";

interface HoldingsOverviewTableProps {
  setToggleSnapshotView: (toggle: boolean) => void;
  snapshotId: number;
}

const HoldingsOverviewTable: React.FC<HoldingsOverviewTableProps> = ({
  setToggleSnapshotView,
  snapshotId,
}) => {
  const dollarFormatter = usdFormatter();
  const snapshot = useSelector(selectHoldingsBySnapshotId(snapshotId));

  const onDisplaySnapshots = () => {
    setToggleSnapshotView(true);
  };

  const renderHoldings = () => {
    const table: JSX.Element[] = [];
    let netTotal = 0;

    snapshot.forEach((account) => {
      const keys = ["traditional", "roth", "taxable"];
      let accountTotal: number = 0;
      let firstRow = true;

      keys.forEach((accountTypeKey) => {
        let accountTypeTotal = 0;
        account.accountType[accountTypeKey].forEach((holding, holdingIndex) => {
          accountTypeTotal += holding.total;
          accountTotal += holding.total;
          if (firstRow && holdingIndex === 0) {
            firstRow = false;
            table.push(
              <tr key={uuidv4()}>
                <td>
                  {account.accountName[0].toUpperCase() +
                    account.accountName.slice(1)}
                </td>
                <td>
                  {accountTypeKey[0].toUpperCase() + accountTypeKey.slice(1)}
                </td>
                <td>
                  {holding.title[0].toUpperCase() + holding.title.slice(1)}
                </td>
                <td>{holding.ticker.toUpperCase()}</td>
                <td>
                  {holding.category[0].toUpperCase() +
                    holding.category.slice(1)}
                </td>
                <td>
                  {parseFloat(holding.expenseRatio.toString()).toFixed(2)}
                </td>
                <td>{"$" + dollarFormatter.format(holding.total).slice(1)}</td>
              </tr>
            );
          } else if (holdingIndex === 0) {
            table.push(
              <tr key={uuidv4()}>
                <td>-</td>
                <td>
                  {accountTypeKey[0].toUpperCase() + accountTypeKey.slice(1)}
                </td>
                <td>
                  {holding.title[0].toUpperCase() + holding.title.slice(1)}
                </td>
                <td>{holding.ticker.toUpperCase()}</td>
                <td>
                  {holding.category[0].toUpperCase() +
                    holding.category.slice(1)}
                </td>
                <td>
                  {parseFloat(holding.expenseRatio.toString()).toFixed(2)}
                </td>
                <td>{"$" + dollarFormatter.format(holding.total).slice(1)}</td>
              </tr>
            );
          } else {
            table.push(
              <tr key={uuidv4()}>
                <td>-</td>
                <td>-</td>
                <td>
                  {holding.title[0].toUpperCase() + holding.title.slice(1)}
                </td>
                <td>{holding.ticker.toUpperCase()}</td>
                <td>
                  {holding.category[0].toUpperCase() +
                    holding.category.slice(1)}
                </td>
                <td>
                  {parseFloat(holding.expenseRatio.toString()).toFixed(2)}
                </td>
                <td>{"$" + dollarFormatter.format(holding.total).slice(1)}</td>
              </tr>
            );
          }
        });

        if (account.accountType[accountTypeKey].length) {
          table.push(
            <tr key={uuidv4()}>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>
                <b>
                  **
                  {accountTypeKey[0].toUpperCase() +
                    accountTypeKey.slice(1)}{" "}
                  Total: **
                </b>
              </td>
              <td>{"$" + dollarFormatter.format(accountTypeTotal).slice(1)}</td>
            </tr>
          );
        }
      });
      table.push(
        <tr key={uuidv4()}>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>
            <b>
              {" "}
              ***
              {account.accountName[0].toUpperCase() +
                account.accountName.slice(1)}{" "}
              Total: ***
            </b>
          </td>
          <td>{"$" + dollarFormatter.format(accountTotal).slice(1)}</td>
        </tr>
      );

      netTotal += accountTotal;
    });

    table.push(
      <tr key={uuidv4()}>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>
          <b> ***** Net Worth: *****</b>
        </td>
        <td>{"$" + dollarFormatter.format(netTotal).slice(1)}</td>
      </tr>
    );

    return table;
  };

  return (
    <div className="card-body">
      <div className="table-responsive">
        <table
          id="example"
          className="table table-striped table-bordered"
          style={{ width: "100%", borderTop: "1px solid grey" }}
        >
          <thead>
            <tr>
              <th className="wd-10p">Holding Location</th>
              <th className="wd-10p">Account Type</th>
              <th className="wd-10p">Holding Name</th>
              <th className="wd-10p">Holding Ticker</th>
              <th className="wd-10p">Holding Type</th>
              <th className="wd-10p">Holding ER</th>
              <th className="wd-10p">Amount</th>
            </tr>
          </thead>

          <tbody>{renderHoldings()}</tbody>
        </table>
        <button
          onClick={onDisplaySnapshots}
          className="btn btn-primary ml-auto"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default HoldingsOverviewTable;
