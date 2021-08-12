import React from "react";
import Button from "../forms/Button";

interface CardAddSnapshotsTable {}

const CardAddSnapshots: React.FC<CardAddSnapshotsTable> = () => {
  return (
    <form>
      <div className="card">
        <div className="card-status bg-yellow br-tr-3 br-tl-3"></div>
        <div className="row">
          {/* Title */}
          <div className="col-md-7 col-lg-7">
            <div className="card-header">
              <input
                type="text"
                className="form-control"
                name="example-text-input"
                placeholder="Snapshot Title Goes Here"
                required
              ></input>
            </div>
          </div>

          {/* Date */}
          <div className="col-md-5 col-lg-5">
            <div className="card-header">
              <input
                type="date"
                className="form-control fc-datepicker"
                placeholder="Date"
                required
              ></input>
            </div>
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
                  <th className="wd-10p">Location</th>
                  <th className="wd-10p">Type</th>
                  <th className="wd-10p">Other ($)</th>
                  <th className="wd-10p">Total ($)</th>
                  <th className="wd-10p"></th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>column data</td>
                  <td>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a className="icon"></a>
                    <a
                      href="javascript:void(0)"
                      className="btn btn-danger btn-sm"
                    >
                      <i className="fas fa-trash"></i> Delete{" "}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>

            <br></br>

            <div className="form-group">
              <label className="form-label">Notes</label>
              <textarea
                className="form-control"
                name="example-textarea-input"
                rows={2}
                placeholder="Enter notes here"
              ></textarea>
            </div>

            <br></br>

            <Button title="Save Snapshot" />
          </div>
        </div>
      </div>
    </form>
  );
};

export default CardAddSnapshots;
