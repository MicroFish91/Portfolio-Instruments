import * as Effects from "redux-saga/effects";
import { accountsConverter } from "../api/conversions";
import { IncomingSnapshotFetchRaw } from "../api/types";
import { clearUserAction } from "../User/userSlice";
import { clearAccountsAction, setAccountsAction } from "./accountSlice";

const call: any = Effects.call;
const takeLatest: any = Effects.takeLatest;

// Watchers
function* onLogoutUser() {
  yield takeLatest(clearUserAction.type, clearAccounts);
}

// Workers - triggered by snapshotSagas
export function* setAccounts(snapshot: IncomingSnapshotFetchRaw) {
  const convertedData = accountsConverter.toClient(snapshot);
  yield Effects.put(setAccountsAction(convertedData));
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
