import { SnapshotsDashboardReducerSuccess } from "../../../Snapshots/types";
import { IncomingSnapshotsFetchRaw } from "../../types";

export const toClient = (
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
