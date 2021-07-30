import { SnapshotsReducerSuccess } from "../../../Snapshots/types";
import { IncomingSnapshotFetchRaw } from "../../endpoints/types";

export const toClient = (
  serverSnapshots: IncomingSnapshotFetchRaw
): SnapshotsReducerSuccess => {
  const reducerData: SnapshotsReducerSuccess = {
    byId: {},
    allIds: [],
  };

  serverSnapshots.data.forEach((snapshot) => {
    reducerData.byId[snapshot.id] = {
      title: snapshot.title,
      benchmark: snapshot.benchmark,
      notes: snapshot.notes,
      date: snapshot.specifiedDate,
    };
    reducerData.allIds.push(snapshot.id.toString());
  });
  return reducerData;
};
