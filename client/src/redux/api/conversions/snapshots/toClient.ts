import {
  SnapshotsDashboardReducerSuccess,
  SnapshotsPaginateReducerSuccess,
} from "../../../Snapshots/types";
import {
  IncomingPaginateSnapshotsFetchRaw,
  IncomingSnapshotsFetchRaw,
} from "../../types";

export const toClientDashboard = (
  serverSnapshots: IncomingSnapshotsFetchRaw
): SnapshotsDashboardReducerSuccess => {
  const reducedSnapshots: SnapshotsDashboardReducerSuccess = {
    byId: {},
    dashboardIds: [],
  };

  serverSnapshots.data.forEach((snapshot) => {
    reducedSnapshots.byId[snapshot.id] = {
      title: snapshot.title,
      benchmark: snapshot.benchmark,
      notes: snapshot.notes,
      date: snapshot.specifiedDate,
      total: snapshot.total,
      weightedExpenseRatio: snapshot.weightedExpenseRatio,
    };
    reducedSnapshots.dashboardIds.push(snapshot.id.toString());
  });
  return reducedSnapshots;
};

export const toClientPaginate = (
  serverSnapshots: IncomingPaginateSnapshotsFetchRaw
): SnapshotsPaginateReducerSuccess => {
  const reducedSnapshots: SnapshotsPaginateReducerSuccess = {
    byId: {},
    allIds: [],
  };

  serverSnapshots.data.forEach((snapshot) => {
    reducedSnapshots.byId[snapshot.id] = {
      title: snapshot.title,
      benchmark: snapshot.benchmark,
      notes: snapshot.notes,
      date: snapshot.specifiedDate,
      total: snapshot.total,
      weightedExpenseRatio: snapshot.weightedExpenseRatio,
    };
    reducedSnapshots.allIds.push(snapshot.id.toString());
  });

  return reducedSnapshots;
};
