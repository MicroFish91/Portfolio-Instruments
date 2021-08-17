import { Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Snapshot } from "../../pages/AddSnapshots/types";
import { usdFormatter } from "../../utils";
import { snapshotFormSchema } from "../../validation/snapshots";
import { SnapshotForm } from "../../validation/types";
import Button from "../forms/Button";
import DateField from "../forms/DateField";
import InputField from "../forms/InputField";
import TextArea from "../forms/TextArea";

interface CardAddSnapshotsTableProps {
  deleteHolding: (
    e: React.MouseEvent<HTMLElement>,
    accountName: string,
    accountType: string,
    holdingTicker: string
  ) => void;
  resetSnapshotData: () => void;
  submitSnapshotData: (snapshot: SnapshotForm) => void;
  snapshot: Snapshot;
}

const CardAddSnapshotsTable: React.FC<CardAddSnapshotsTableProps> = ({
  deleteHolding,
  resetSnapshotData,
  submitSnapshotData,
  snapshot,
}) => {
  const dollarFormatter = usdFormatter();
  let accountTotal = 0;

  const submitSnapshot = (
    values: SnapshotForm,
    actions: FormikHelpers<SnapshotForm>
  ) => {
    if (snapshot.length !== 0) {
      if (accountTotal > 0) {
        submitSnapshotData(values);
        actions.resetForm();
      } else {
        alert("Unable to submit a snapshot less than or equal to zero.");
      }
    } else {
      alert("Please enter a holding before attempting to save a snapshot.");
    }
  };

  const resetSnapshot = () => {
    resetSnapshotData();
  };

  const renderSnapshots = () => {
    const table: JSX.Element[] = [];

    snapshot.forEach((account) => {
      const keys = ["traditional", "roth", "taxable"];
      accountTotal = 0;
      let firstRow = true;

      keys.forEach((accountTypeKey) => {
        let accountTypeTotal = 0;
        account.accountType[accountTypeKey].forEach((holding, holdingIndex) => {
          accountTypeTotal += holding.holdingAmount;
          accountTotal += holding.holdingAmount;
          console.log(holding.holdingVP);
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
                <td>{holding.holdingTicker.toUpperCase()}</td>
                <td>
                  {holding.assetType[0].toUpperCase() +
                    holding.assetType.slice(1)}
                </td>
                {holding.holdingVP ? <td>&#10003;</td> : <td>-</td>}
                <td>
                  {"$" + dollarFormatter.format(holding.holdingAmount).slice(1)}
                </td>
                <td>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <a className="icon"></a>
                  <a
                    href="javascript:void(0)"
                    className="btn btn-danger btn-sm"
                    onClick={(e: React.MouseEvent<HTMLElement>) =>
                      deleteHolding(
                        e,
                        account.accountName,
                        accountTypeKey,
                        holding.holdingTicker
                      )
                    }
                  >
                    <i className="fas fa-trash"></i> Delete{" "}
                  </a>
                </td>
              </tr>
            );
          } else if (holdingIndex === 0) {
            table.push(
              <tr key={uuidv4()}>
                <td>-</td>
                <td>
                  {accountTypeKey[0].toUpperCase() + accountTypeKey.slice(1)}
                </td>
                <td>{holding.holdingTicker.toUpperCase()}</td>
                <td>
                  {holding.assetType[0].toUpperCase() +
                    holding.assetType.slice(1)}
                </td>
                {holding.holdingVP ? <td>&#10003;</td> : <td>-</td>}
                <td>
                  {"$" + dollarFormatter.format(holding.holdingAmount).slice(1)}
                </td>
                <td>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <a className="icon"></a>
                  <a
                    href="javascript:void(0)"
                    className="btn btn-danger btn-sm"
                    onClick={(e: React.MouseEvent<HTMLElement>) =>
                      deleteHolding(
                        e,
                        account.accountName,
                        accountTypeKey,
                        holding.holdingTicker
                      )
                    }
                  >
                    <i className="fas fa-trash"></i> Delete{" "}
                  </a>
                </td>
              </tr>
            );
          } else {
            table.push(
              <tr key={uuidv4()}>
                <td>-</td>
                <td>-</td>
                <td>{holding.holdingTicker.toUpperCase()}</td>
                <td>
                  {holding.assetType[0].toUpperCase() +
                    holding.assetType.slice(1)}
                </td>
                {holding.holdingVP ? <td>&#10003;</td> : <td>-</td>}
                <td>
                  {"$" + dollarFormatter.format(holding.holdingAmount).slice(1)}
                </td>
                <td>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <a className="icon"></a>
                  <a
                    href="javascript:void(0)"
                    className="btn btn-danger btn-sm"
                    onClick={(e: React.MouseEvent<HTMLElement>) =>
                      deleteHolding(
                        e,
                        account.accountName,
                        accountTypeKey,
                        holding.holdingTicker
                      )
                    }
                  >
                    <i className="fas fa-trash"></i> Delete{" "}
                  </a>
                </td>
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
    });

    return table;
  };

  return (
    <Formik
      initialValues={{
        snapshotTitle: "",
        snapshotDate: "",
        snapshotNotes: "",
      }}
      validationSchema={snapshotFormSchema}
      onSubmit={(values, actions) => submitSnapshot(values, actions)}
      onReset={resetSnapshot}
    >
      {() => (
        <Form>
          <div className="card">
            <div className="card-status bg-yellow br-tr-3 br-tl-3"></div>
            <div className="row">
              {/* Title */}
              <div className="col-md-7 col-lg-7">
                <InputField
                  label=""
                  className="card-header"
                  name="snapshotTitle"
                  placeholder="Snapshot title goes here"
                  type="text"
                />
              </div>

              {/* Date */}
              <div className="col-md-5 col-lg-5">
                <DateField
                  label=""
                  className="card-header"
                  name="snapshotDate"
                  placeholder="Date"
                />
              </div>
            </div>

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
                      <th className="wd-10p">Holding Ticker</th>
                      <th className="wd-10p">Holding Type</th>
                      <th className="wd-10p">Variable Portfolio</th>
                      <th className="wd-10p">Amount</th>
                      <th className="wd-10p">Delete</th>
                    </tr>
                  </thead>

                  <tbody>{renderSnapshots()}</tbody>
                </table>

                <br></br>

                <TextArea
                  label="Snapshot Notes"
                  name="snapshotNotes"
                  placeholder="Notes"
                  rows={2}
                  type="text"
                />

                <br></br>

                <Button title="Save Snapshot" />
                <Button title="Reset Snapshot" type="reset" />
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CardAddSnapshotsTable;
