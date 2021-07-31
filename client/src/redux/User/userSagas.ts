import * as Effects from "redux-saga/effects";
import { LoginForm, RegistrationForm } from "../../validation/types";
import {
  userLoginEndpoint,
  userRegistrationEndpoint,
} from "../api/endpoints/userEndpoints";
import {
  userLoginAction,
  userLoginFailAction,
  userLoginSuccessAction,
  userRegisterAction,
  userRegisterFailAction,
  userRegisterSuccessAction,
} from "./userSlice";

const call: any = Effects.call;
const takeLatest: any = Effects.takeLatest;

// Watchers
function* onLoginUser() {
  yield takeLatest(userLoginAction.type, loginUser);
}

function* onRegisterUser() {
  yield takeLatest(userRegisterAction.type, registerUser);
}

// Workers
function* loginUser({ payload }: { payload: LoginForm }) {
  const { data, error } = yield userLoginEndpoint(payload);
  if (data) {
    yield Effects.put(userLoginSuccessAction(data));
  } else if (error) {
    yield Effects.put(userLoginFailAction(error));
  }
  return;
}

function* registerUser({ payload }: { payload: RegistrationForm }) {
  const { data, error } = yield userRegistrationEndpoint(payload);
  if (data) {
    yield Effects.put(userRegisterSuccessAction(data));
  } else if (error) {
    yield Effects.put(userRegisterFailAction(error));
  }
  return;
}

// Export
export default function* userSagas() {
  yield Effects.all([call(onLoginUser), call(onRegisterUser)]);
}
