import * as Effects from "redux-saga/effects";
import snapshotSagas from "./Snapshots/snapshotSagas";
import userSagas from "./User/userSagas";

const call: any = Effects.call;

// watcher saga => actions => worker saga
function* rootSaga() {
  yield Effects.all([call(userSagas), call(snapshotSagas)]);
}

export default rootSaga;
