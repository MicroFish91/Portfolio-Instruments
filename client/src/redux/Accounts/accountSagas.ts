import * as Effects from "redux-saga/effects";
import { accountsConverter } from "../api/conversions";
import {
  IncomingPaginateSnapshotsFetchRaw,
  IncomingSnapshotFetchRaw,
} from "../api/types";
import { clearUserAction } from "../User/userSlice";
import {
  clearAccountsAction,
  setDashboardAccountsAction,
  setPaginatedAccountsAction,
} from "./accountSlice";

const call: any = Effects.call;
const takeLatest: any = Effects.takeLatest;

// Watchers
function* onLogoutUser() {
  yield takeLatest(clearUserAction.type, clearAccounts);
}

// Workers - triggered by snapshotSagas
export function* setDashboardAccounts(snapshot: IncomingSnapshotFetchRaw) {
  const convertedData = accountsConverter.toClientDashboard(snapshot);
  yield Effects.put(setDashboardAccountsAction(convertedData));
  return;
}

export function* setPaginateAccounts(
  snapshot: IncomingPaginateSnapshotsFetchRaw
) {
  const convertedData = accountsConverter.toClientPaginate(snapshot);
  yield Effects.put(setPaginatedAccountsAction(convertedData));
  return;
}

export function* clearAccounts() {
  yield Effects.put(clearAccountsAction());
  return;
}

// Export
export default function* accountSagas() {
  yield Effects.all([call(onLogoutUser)]);
}
