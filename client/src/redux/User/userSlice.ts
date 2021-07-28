import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginForm, RegistrationForm } from "../../validation/types";
import { CurrentUser, UserError } from "./userTypes";

const INITIAL_STATE = {
  currentUser: {
    email: "",
    firstName: "",
    lastName: "",
  },
  jwtToken: "",
  error: {
    status: "",
    message: "",
  },
  isLoading: false,
};

/*
 * SAGA Watchers: login, register
 * SAGA Workers: loginFail, loginSuccess, registerFail, registerSuccess
 */
const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    login: (state, _action: PayloadAction<LoginForm>) => {
      state.isLoading = true;
    },
    loginSuccess: (
      state,
      { payload }: PayloadAction<{ currentUser: CurrentUser; jwtToken: string }>
    ) => {
      state.currentUser = payload.currentUser;
      state.jwtToken = payload.jwtToken;
      state.error = {
        status: "",
        message: "",
      };
      state.isLoading = false;
    },
    loginFail: (state, { payload }: PayloadAction<UserError>) => {
      state.currentUser = {
        email: "",
        firstName: "",
        lastName: "",
      };
      state.jwtToken = "";
      state.error = {
        status: payload?.status ? payload.status.toString() : "",
        message: payload?.message ? payload.message : "",
      };
      state.isLoading = false;
    },
    register: (state, _action: PayloadAction<RegistrationForm>) => {
      state.isLoading = true;
    },
    registerSuccess: (
      state,
      { payload }: PayloadAction<{ currentUser: CurrentUser; jwtToken: string }>
    ) => {
      state.currentUser = payload.currentUser;
      state.jwtToken = payload.jwtToken;
      state.error = {
        status: "",
        message: "",
      };
      state.isLoading = false;
    },
    registerFail: (state, { payload }: PayloadAction<UserError>) => {
      state.currentUser = {
        email: "",
        firstName: "",
        lastName: "",
      };
      state.jwtToken = "";
      state.error = {
        status: payload?.status ? payload.status.toString() : "",
        message: payload?.message ? payload.message : "",
      };
      state.isLoading = false;
    },
  },
});

export const {
  login: userLoginAction,
  loginSuccess: userLoginSuccessAction,
  loginFail: userLoginFailAction,
  register: userRegisterAction,
  registerSuccess: userRegisterSuccessAction,
  registerFail: userRegisterFailAction,
} = userSlice.actions;

export default userSlice.reducer;
