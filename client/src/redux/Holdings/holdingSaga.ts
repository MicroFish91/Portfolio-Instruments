import * as Effects from "redux-saga/effects";
import { holdingsConverter } from "../api/conversions";
import {
  IncomingPaginateSnapshotsFetchRaw,
  IncomingSnapshotFetchRaw,
} from "../api/types";
import { clearUserAction } from "../User/userSlice";
import {
  clearHoldingsAction,
  setDashboardHoldingsAction,
  setPaginateHoldingsAction,
} from "./holdingSlice";

const call: any = Effects.call;
const takeLatest: any = Effects.takeLatest;

// Watchers
function* onLogoutUser() {
  yield takeLatest(clearUserAction.type, clearHoldings);
}

// Workers - triggered by snapshotSagas
export function* setDashboardHoldings(snapshot: IncomingSnapshotFetchRaw) {
  const convertedData = holdingsConverter.toClientDashboard(snapshot);
  yield Effects.put(setDashboardHoldingsAction(convertedData));
  return;
}

export function* setPaginateHoldings(
  snapshot: IncomingPaginateSnapshotsFetchRaw
) {
  const convertedData = holdingsConverter.toClientPaginate(snapshot);
  yield Effects.put(setPaginateHoldingsAction(convertedData));
  return;
}

export function* clearHoldings() {
  yield Effects.put(clearHoldingsAction());
  return;
}

// Export
export default function* holdingSagas() {
  yield Effects.all([call(onLogoutUser)]);
}
