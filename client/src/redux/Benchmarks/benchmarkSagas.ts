import * as Effects from "redux-saga/effects";
import {
  getBenchmarkEndpoint,
  setBenchmarkEndpoint,
} from "../api/endpoints/benchmarkEndpoints";
import { clearUserAction } from "../User/userSlice";
import {
  clearBenchmarkAction,
  initGetBenchmarkAction,
  initPostBenchmarkAction,
  setBenchmarkAction,
  setBenchmarkErrorAction,
} from "./benchmarkSlice";

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

export function* setBenchmark(benchmark: string) {
  const { data, error } = yield setBenchmarkEndpoint(benchmark);
  console.log(data);
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
    call(onLogoutUser),
  ]);
}
