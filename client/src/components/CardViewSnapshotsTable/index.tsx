import React from "react";

interface CardViewSnapshotsTableProps {}

const CardViewSnapshotsTable: React.FC<CardViewSnapshotsTableProps> = () => {
  return (
    <div className="card">
      <div className="card-status bg-yellow br-tr-3 br-tl-3"></div>
      <div className="card-header">
        <div className="card-title">Snapshots List</div>
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
                <th className="wd-20p">Title</th>
                <th className="wd-10p">Benchmark</th>
                <th className="wd-25p">Notes</th>
                <th className="wd-15p">Date</th>
                <th className="wd-10p">Net Worth</th>
                <th className="wd-10p">Weighted ER</th>
                <th className="wd-10p">Delete</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>title</td>
                <td>benchmark</td>
                <td>notes</td>
                <td>date</td>
                <td>total</td>
                <td>$200.89</td>
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
        </div>
        <button type="submit" className="btn btn-primary ml-auto">
          Next
        </button>
        &nbsp; &nbsp;
        <button type="submit" className="btn btn-primary ml-auto">
          Previous
        </button>
        <br></br>
      </div>
    </div>
  );
};

export default CardViewSnapshotsTable;
