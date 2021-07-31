import { SnapshotsReducerSuccess } from "../../../Snapshots/types";
import { IncomingSnapshotsFetchRaw } from "../../types";

export const toClient = (
  serverSnapshots: IncomingSnapshotsFetchRaw
): SnapshotsReducerSuccess => {
  const reducedSnapshots: SnapshotsReducerSuccess = {
    byId: {},
    allIds: [],
  };

  serverSnapshots.data.forEach((snapshot) => {
    reducedSnapshots.byId[snapshot.id] = {
      title: snapshot.title,
      benchmark: snapshot.benchmark,
      notes: snapshot.notes,
      date: snapshot.specifiedDate,
    };
    reducedSnapshots.allIds.push(snapshot.id.toString());
  });
  return reducedSnapshots;
};
