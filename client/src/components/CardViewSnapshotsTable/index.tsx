import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { selectAllSnapshots } from "../../redux/Snapshots/snapshotSelector";
import { initPaginateSnapshotsAction } from "../../redux/Snapshots/snapshotSlice";
import { formatDate, usdFormatter } from "../../utils";

interface CardViewSnapshotsTableProps {}

const CardViewSnapshotsTable: React.FC<CardViewSnapshotsTableProps> = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const snapshots = useSelector(selectAllSnapshots);
  const dollarFormatter = usdFormatter();
  const SNAPSHOTS_PER_PAGE = 10;

  const maxPages = snapshots.length / SNAPSHOTS_PER_PAGE + 1;

  useEffect(() => {
    dispatch(initPaginateSnapshotsAction());
  }, []);

  const onNextPage = () => {
    setPage(page + 1);
  };

  const onPreviousPage = () => {
    setPage(page - 1);
  };

  const renderRow = () => {
    const snapshotRender = [];
    const startIndex = (page - 1) * SNAPSHOTS_PER_PAGE;
    const endIndex =
      page !== Math.floor(maxPages)
        ? startIndex + SNAPSHOTS_PER_PAGE
        : (page - 1) * SNAPSHOTS_PER_PAGE +
          (snapshots.length % SNAPSHOTS_PER_PAGE);
    for (let pageIndex = startIndex; pageIndex < endIndex; pageIndex++) {
      snapshotRender.push(
        <tr key={uuidv4()} id={snapshots[pageIndex].id}>
          <td>{snapshots[pageIndex].title}</td>
          <td>{snapshots[pageIndex].benchmark}</td>
          <td>{snapshots[pageIndex].notes}</td>
          <td>{formatDate(snapshots[pageIndex].date)}</td>
          <td>{dollarFormatter.format(snapshots[pageIndex].total)}</td>
          <td>
            {parseFloat(
              snapshots[pageIndex].weightedExpenseRatio.toString()
            ).toFixed(2)}
          </td>
          <td>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a className="icon"></a>
            <a href="javascript:void(0)" className="btn btn-danger btn-sm">
              <i className="fas fa-trash"></i> Delete{" "}
            </a>
          </td>
        </tr>
      );
    }

    return snapshotRender;
  };

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

            <tbody>{renderRow()}</tbody>
          </table>
        </div>
        {page < maxPages - 1 && (
          <button onClick={onNextPage} className="btn btn-primary ml-auto">
            Next
          </button>
        )}
        &nbsp; &nbsp;
        {page > 1 && (
          <button onClick={onPreviousPage} className="btn btn-primary ml-auto">
            Previous
          </button>
        )}
        <br></br>
      </div>
    </div>
  );
};

export default CardViewSnapshotsTable;
