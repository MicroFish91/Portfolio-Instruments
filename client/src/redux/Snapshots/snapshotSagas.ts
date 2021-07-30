import * as Effects from "redux-saga/effects";
import { snapshotsConverter } from "../api/conversions";
import { getRecentSnapshotsEndpoint } from "../api/endpoints/snapshotEndpoints";
import {
  initSnapshotsAction,
  updateSnapshotsFailAction,
  updateSnapshotsSuccessAction,
} from "./snapshotSlice";

const call: any = Effects.call;
const takeLatest: any = Effects.takeLatest;

// Watchers
function* onInitSnapshots() {
  yield takeLatest(initSnapshotsAction.type, getRecentSnapshots);
}

// Workers
function* getRecentSnapshots() {
  const { data, error } = yield getRecentSnapshotsEndpoint();
  if (data) {
    const convertedData = snapshotsConverter.toClient(data);
    yield Effects.put(updateSnapshotsSuccessAction(convertedData));
  } else if (error) {
    yield Effects.put(updateSnapshotsFailAction(error));
  }
  return;
}

// Export
export default function* userSagas() {
  yield Effects.all([call(onInitSnapshots)]);
}
