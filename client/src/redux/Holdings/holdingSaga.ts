import * as Effects from "redux-saga/effects";
import { holdingsConverter } from "../api/conversions";
import { IncomingSnapshotFetchRaw } from "../api/types";
import { clearHoldingsAction, setHoldingsAction } from "./holdingSlice";

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
