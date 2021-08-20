import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import {
  selectAccountsAllIds,
  selectAccountsById,
} from "../../redux/Accounts/Selectors";
import {
  selectHoldingsAllIds,
  selectHoldingsById,
} from "../../redux/Holdings/Selectors";
import {
  selectAllSnapshots,
  selectSnapshotLoading,
} from "../../redux/Snapshots/Selectors";
import {
  initPaginateSnapshotsAction,
  removeSnapshotAction,
} from "../../redux/Snapshots/snapshotSlice";
import HoldingsOverviewTable from "./HoldingsOverviewTable";
import SnapshotsOverviewTable from "./SnapshotsOverviewTable";

interface CardViewAssetsTableProps {}

const CardViewAssetsTable: React.FC<CardViewAssetsTableProps> = () => {
  const [toggleSnapshotView, setToggleSnapshotView] = useState(true);
  const [snapshotId, setSnapshotId] = useState(0);
  const snapshots = useSelector(selectAllSnapshots);
  const accountsById = useSelector(selectAccountsById);
  const accountsList = useSelector(selectAccountsAllIds);
  const holdingsById = useSelector(selectHoldingsById);
  const holdingsList = useSelector(selectHoldingsAllIds);
  const isLoading = useSelector(selectSnapshotLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initPaginateSnapshotsAction());
  }, []);

  const getAccountIds = (id: number) => {
    const accountIds = accountsList.filter((accountId) => {
      return accountsById[accountId].snapshotId === id;
    });

    return accountIds;
  };

  const getHoldingIds = (accountIds: string[]) => {
    let holdingIds: string[] = [];

    accountIds.forEach((accountId) => {
      const ids = holdingsList.filter((holdingId) => {
        return holdingsById[holdingId].accountId === parseInt(accountId);
      });

      holdingIds = [...holdingIds, ...ids];
    });

    return holdingIds;
  };

  const deleteSnapshot = (id: number) => {
    const accountIds = getAccountIds(id);
    const holdingIds = getHoldingIds(accountIds);

    dispatch(
      removeSnapshotAction({
        snapshotId: id,
        accountIds,
        holdingIds,
      })
    );
  };

  return (
    <div className="card">
      <div className="card-status bg-yellow br-tr-3 br-tl-3"></div>
      {isLoading && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ClipLoader size={180} color="purple" />
        </div>
      )}

      {!isLoading && toggleSnapshotView && (
        <SnapshotsOverviewTable
          deleteSnapshot={deleteSnapshot}
          setSnapshotId={setSnapshotId}
          setToggleSnapshotView={setToggleSnapshotView}
          snapshots={snapshots}
        />
      )}

      {!isLoading && !toggleSnapshotView && (
        <HoldingsOverviewTable
          setToggleSnapshotView={setToggleSnapshotView}
          snapshotId={snapshotId}
        />
      )}
    </div>
  );
};

export default CardViewAssetsTable;
