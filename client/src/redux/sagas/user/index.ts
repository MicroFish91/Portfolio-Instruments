import * as Effects from "redux-saga/effects";
import { userActions } from "../../actions";
import { api } from "../../api";
import { USER_TYPES } from "../../constants";
import { user } from "../../types";

const call: any = Effects.call;
const takeLatest: any = Effects.takeLatest;

// Workers
function* registerUser({ payload }: { payload: user }) {
  const { data, error } = yield api.user.post(payload);
  if (data) {
    yield Effects.put(userActions.registerSuccess(data));
  } else if (error) {
    yield Effects.put(userActions.registerFail(error));
  }
  return;
}

// Watchers
function* onRegisterUser() {
  yield takeLatest(USER_TYPES.REGISTER, registerUser);
}

export default function* userSagas() {
  yield Effects.all([call(onRegisterUser)]);
}
