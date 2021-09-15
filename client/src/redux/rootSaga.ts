import * as Effects from "redux-saga/effects";
import accountSagas from "./Accounts/accountSagas";
import benchmarkSagas from "./Benchmarks/benchmarkSagas";
import holdingSagas from "./Holdings/holdingSaga";
import snapshotSagas from "./Snapshots/snapshotSagas";
import userSagas from "./User/userSagas";

const call: any = Effects.call;

// watcher saga => actions => worker saga
function* rootSaga() {
  yield Effects.all([
    call(userSagas),
    call(benchmarkSagas),
    call(snapshotSagas),
    call(accountSagas),
    call(holdingSagas),
  ]);
}

export default rootSaga;
