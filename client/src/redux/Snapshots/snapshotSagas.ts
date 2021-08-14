import * as Effects from "redux-saga/effects";
import { clearAccounts, setAccounts } from "../Accounts/accountSagas";
import { snapshotsConverter } from "../api/conversions";
import {
  getLatestSnapshotEndpoint,
  getLineChartSnapshotsEndpoint,
  postSnapshotEndpoint,
} from "../api/endpoints/snapshotEndpoints";
import { OutgoingSnapshot, OutgoingSnapshotRaw } from "../api/types";
import { clearHoldings, setHoldings } from "../Holdings/holdingSaga";
import { clearUserAction } from "../User/userSlice";
import {
  clearSnapshotsAction,
  initDashboardSnapshotsAction,
  postSnapshotAction,
  setDashboardSnapshotsSuccessAction,
  setSnapshotsFailAction,
} from "./snapshotSlice";

const call: any = Effects.call;
const takeLatest: any = Effects.takeLatest;

// Watchers
function* onInitDashboardSnapshots() {
  yield takeLatest(initDashboardSnapshotsAction.type, getLatestSnapshot);
  yield takeLatest(initDashboardSnapshotsAction.type, getLineChartSnapshots);
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

function* getLineChartSnapshots() {
  const { data, error } = yield getLineChartSnapshotsEndpoint();
  if (data) {
    const convertedData = snapshotsConverter.toClient(data);
    yield Effects.put(setDashboardSnapshotsSuccessAction(convertedData));
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
    yield Effects.put(initDashboardSnapshotsAction());
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
    call(onInitDashboardSnapshots),
    call(onPostSnapshot),
    call(onLogoutUser),
  ]);
}
