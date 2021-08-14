import * as Effects from "redux-saga/effects";
import { clearAccounts, setAccounts } from "../Accounts/accountSagas";
import { snapshotsConverter } from "../api/conversions";
import {
  getLatestSnapshotEndpoint,
  getRecentSnapshotsEndpoint,
  postSnapshotEndpoint,
} from "../api/endpoints/snapshotEndpoints";
import { OutgoingSnapshot, OutgoingSnapshotRaw } from "../api/types";
import { clearHoldings, setHoldings } from "../Holdings/holdingSaga";
import { clearUserAction } from "../User/userSlice";
import {
  clearSnapshotsAction,
  initSnapshotsAction,
  postSnapshotAction,
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

function* onPostSnapshot() {
  yield takeLatest(postSnapshotAction.type, postSnapshot);
}

function* onLogoutUser() {
  yield takeLatest(clearUserAction.type, logoutUser);
}

// Workers
function* getLatestSnapshot() {
  const { data, error } = yield getLatestSnapshotEndpoint();
  if (data) {
    yield call(setAccounts, data);
    yield call(setHoldings, data);
  } else if (error) {
    yield Effects.put(setSnapshotsFailAction(error));
    yield Effects.call(clearAccounts);
    yield Effects.call(clearHoldings);
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
    yield Effects.call(clearHoldings);
  }
  return;
}

function* postSnapshot(clientAction: {
  type: string;
  payload: OutgoingSnapshotRaw;
}) {
  const formattedSnapshot: OutgoingSnapshot =
    snapshotsConverter.toServer(clientAction);
  const { data, error } = yield postSnapshotEndpoint(formattedSnapshot);
  if (data) {
    yield Effects.put(clearSnapshotsAction());
    yield Effects.put(initSnapshotsAction());
  } else {
    yield Effects.put(setSnapshotsFailAction(error));
  }
}

function* logoutUser() {
  yield Effects.put(clearSnapshotsAction());
}

// Export
export default function* userSagas() {
  yield Effects.all([
    call(onInitSnapshots),
    call(onPostSnapshot),
    call(onLogoutUser),
  ]);
}
