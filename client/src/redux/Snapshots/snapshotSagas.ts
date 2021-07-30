import * as Effects from "redux-saga/effects";
import { clearAccounts, setAccounts } from "../Accounts/accountSagas";
import { snapshotsConverter } from "../api/conversions";
import {
  getLatestSnapshotEndpoint,
  getRecentSnapshotsEndpoint,
} from "../api/endpoints/snapshotEndpoints";
import {
  initSnapshotsAction,
  setSnapshotsFailAction,
  setSnapshotsSuccessAction,
} from "./snapshotSlice";

const call: any = Effects.call;
const takeLatest: any = Effects.takeLatest;

// Watchers
function* onInitSnapshots() {
  yield takeLatest(initSnapshotsAction.type, getLatestSnapshot);
  yield takeLatest(initSnapshotsAction.type, getRecentSnapshots);
}

// Workers
function* getLatestSnapshot() {
  const { data, error } = yield getLatestSnapshotEndpoint();
  if (data) {
    yield call(setAccounts, data);
  } else if (error) {
    yield Effects.put(setSnapshotsFailAction(error));
    yield Effects.call(clearAccounts);
  }
  return;
}

function* getRecentSnapshots() {
  const { data, error } = yield getRecentSnapshotsEndpoint();
  if (data) {
    const convertedData = snapshotsConverter.toClient(data);
    yield Effects.put(setSnapshotsSuccessAction(convertedData));
  } else if (error) {
    yield Effects.put(setSnapshotsFailAction(error));
    yield Effects.call(clearAccounts);
  }
  return;
}

// Export
export default function* userSagas() {
  yield Effects.all([call(onInitSnapshots)]);
}
