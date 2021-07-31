import * as Effects from "redux-saga/effects";
import { accountsConverter } from "../api/conversions";
import { IncomingSnapshotFetchRaw } from "../api/types";
import { clearAccountsAction, setAccountsAction } from "./accountSlice";

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
