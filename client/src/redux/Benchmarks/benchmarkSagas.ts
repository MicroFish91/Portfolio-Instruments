import * as Effects from "redux-saga/effects";
import {
  getBenchmarkEndpoint,
  postCustomBenchmarkEndpoint,
  setBenchmarkEndpoint,
} from "../api/endpoints/benchmarkEndpoints";
import { clearUserAction } from "../User/userSlice";
import {
  clearBenchmarkAction,
  initGetBenchmarkAction,
  initPostBenchmarkAction,
  initPostCustomBenchmarkAction,
  setBenchmarkAction,
  setBenchmarkErrorAction,
  setCustomBenchmarkAction,
  setCustomBenchmarkErrorAction,
} from "./benchmarkSlice";
import { CustomBenchmark } from "./types";

const call: any = Effects.call;
const takeLatest: any = Effects.takeLatest;

// Watchers
export function* onLogoutUser() {
  yield takeLatest(clearUserAction.type, logoutUser);
}

export function* onGetBenchmark() {
  yield takeLatest(initGetBenchmarkAction.type, getBenchmark);
}

export function* onPostBenchmark() {
  yield takeLatest(initPostBenchmarkAction.type, postBenchmark);
}

export function* onPostCustomBenchmark() {
  yield takeLatest(initPostCustomBenchmarkAction.type, postCustomBenchmark);
}

// Workers
export function* getBenchmark() {
  const { data } = yield getBenchmarkEndpoint();
  if (data) {
    yield Effects.put(setBenchmarkAction(data));
  } else {
    yield Effects.put(clearBenchmarkAction());
  }
}

export function* postBenchmark(benchmark: { type: string; payload: string }) {
  const { data, error } = yield setBenchmarkEndpoint(benchmark.payload);
  if (data) {
    yield Effects.put(setBenchmarkAction(benchmark.payload));
  } else {
    yield Effects.put(setBenchmarkErrorAction(error));
  }
}

export function* postCustomBenchmark(benchmark: {
  type: string;
  payload: CustomBenchmark;
}) {
  const { data, error } = yield postCustomBenchmarkEndpoint(benchmark.payload);
  if (data) {
    yield Effects.put(setCustomBenchmarkAction(data));
  } else {
    yield Effects.put(setCustomBenchmarkErrorAction(error));
  }
}

export function* setBenchmark(benchmark: string) {
  const { data, error } = yield setBenchmarkEndpoint(benchmark);
  if (data) {
    yield Effects.put(setBenchmarkAction(benchmark));
  } else {
    yield Effects.put(setBenchmarkErrorAction(error));
  }
}

function* logoutUser() {
  yield Effects.put(clearBenchmarkAction());
}

// Export
export default function* benchmarkSagas() {
  yield Effects.all([
    call(onGetBenchmark),
    call(onPostBenchmark),
    call(onPostCustomBenchmark),
    call(onLogoutUser),
  ]);
}
