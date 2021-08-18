import * as Effects from "redux-saga/effects";
import {
  clearAccounts,
  setDashboardAccounts,
  setPaginateAccounts,
} from "../Accounts/accountSagas";
import { snapshotsConverter } from "../api/conversions";
import {
  getLatestSnapshotEndpoint,
  getLineChartSnapshotsEndpoint,
  getPaginateSnapshotsEndpoint,
  postSnapshotEndpoint,
  removeSnapshotEndpoint,
} from "../api/endpoints/snapshotEndpoints";
import { OutgoingSnapshot, OutgoingSnapshotRaw } from "../api/types";
import {
  clearHoldings,
  setDashboardHoldings,
  setPaginateHoldings,
} from "../Holdings/holdingSaga";
import { clearUserAction } from "../User/userSlice";
import {
  clearSnapshotsAction,
  initDashboardSnapshotsAction,
  initPaginateSnapshotsAction,
  postSnapshotAction,
  removeSnapshotAction,
  setDashboardSnapshotsSuccessAction,
  setPaginateSnapshotsSuccessAction,
  setSnapshotsFailAction,
} from "./snapshotSlice";
import { removeSnapshotPayload } from "./types";

const call: any = Effects.call;
const takeLatest: any = Effects.takeLatest;

// Watchers
function* onInitDashboardSnapshots() {
  yield takeLatest(initDashboardSnapshotsAction.type, getLatestSnapshot);
  yield takeLatest(initDashboardSnapshotsAction.type, getLineChartSnapshots);
}

function* onInitPaginateSnapshots() {
  yield takeLatest(initPaginateSnapshotsAction.type, getPaginateSnapshots);
}

function* onPostSnapshot() {
  yield takeLatest(postSnapshotAction.type, postSnapshot);
}

function* onRemoveSnapshot() {
  yield takeLatest(removeSnapshotAction.type, removeSnapshot);
}

function* onLogoutUser() {
  yield takeLatest(clearUserAction.type, logoutUser);
}

// Workers
function* getPaginateSnapshots() {
  const { data, error } = yield getPaginateSnapshotsEndpoint();
  if (data) {
    const convertedData = snapshotsConverter.toClientPaginate(data);
    yield Effects.put(setPaginateSnapshotsSuccessAction(convertedData));
    yield Effects.call(setPaginateAccounts, data);
    yield Effects.call(setPaginateHoldings, data);
  } else if (error) {
    yield Effects.put(setSnapshotsFailAction(error));
    yield Effects.call(clearAccounts);
    yield Effects.call(clearHoldings);
  }
  return;
}

function* getLatestSnapshot() {
  const { data, error } = yield getLatestSnapshotEndpoint();
  if (data.data) {
    yield call(setDashboardAccounts, data);
    yield call(setDashboardHoldings, data);
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
    const convertedData = snapshotsConverter.toClientDashboard(data);
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

function* removeSnapshot(clientAction: {
  type: string;
  payload: removeSnapshotPayload;
}) {
  const { data, error } = yield removeSnapshotEndpoint(clientAction.payload);
  if (data) {
    yield Effects.put(clearSnapshotsAction());
    yield Effects.put(initDashboardSnapshotsAction());
    yield Effects.put(initPaginateSnapshotsAction());
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
    call(onInitPaginateSnapshots),
    call(onRemoveSnapshot),
    call(onPostSnapshot),
    call(onLogoutUser),
  ]);
}
