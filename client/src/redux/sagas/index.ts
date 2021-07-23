import * as Effects from "redux-saga/effects";
import userSagas from "../sagas/user";

const call: any = Effects.call;

// watcher saga => actions => worker saga
function* rootSaga() {
  yield Effects.all([call(userSagas)]);
}

export default rootSaga;
