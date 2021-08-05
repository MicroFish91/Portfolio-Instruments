import * as Effects from "redux-saga/effects";
import { holdingsConverter } from "../api/conversions";
import { IncomingSnapshotFetchRaw } from "../api/types";
import { clearUserAction } from "../User/userSlice";
import { clearHoldingsAction, setHoldingsAction } from "./holdingSlice";

const call: any = Effects.call;
const takeLatest: any = Effects.takeLatest;

// Watchers
function* onLogoutUser() {
  yield takeLatest(clearUserAction.type, clearHoldings);
}

// Workers - triggered by snapshotSagas
export function* setHoldings(snapshot: IncomingSnapshotFetchRaw) {
  const convertedData = holdingsConverter.toClient(snapshot);
  yield Effects.put(setHoldingsAction(convertedData));
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
