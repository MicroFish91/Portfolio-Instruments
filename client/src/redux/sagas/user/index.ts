import * as Effects from "redux-saga/effects";
import { userActions } from "../../actions";
import { api } from "../../api";
import { USER_TYPES } from "../../constants";
import { userLogin, userRegistration } from "../../types";

const call: any = Effects.call;
const takeLatest: any = Effects.takeLatest;

// Workers
function* loginUser({ payload }: { payload: userLogin }) {
  const { data, error } = yield api.user.login(payload);
  if (data) {
    yield Effects.put(userActions.loginSuccess(data));
  } else if (error) {
    yield Effects.put(userActions.loginFail(error));
  }
  return;
}

function* registerUser({ payload }: { payload: userRegistration }) {
  const { data, error } = yield api.user.post(payload);
  if (data) {
    yield Effects.put(userActions.registerSuccess(data));
  } else if (error) {
    yield Effects.put(userActions.registerFail(error));
  }
  return;
}

// Watchers
function* onLoginUser() {
  yield takeLatest(USER_TYPES.LOGIN, loginUser);
}

function* onRegisterUser() {
  yield takeLatest(USER_TYPES.REGISTER, registerUser);
}

export default function* userSagas() {
  yield Effects.all([call(onLoginUser), call(onRegisterUser)]);
}
