import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginForm, RegistrationForm } from "../../validation/types";
import { CurrentUser, UserError } from "./types";
import { removeToken, storeToken } from "./userUtils";

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
 * No Saga: clearUser
 * SAGA Watchers: login, register
 * SAGA Workers: loginFail, loginSuccess, registerFail, registerSuccess
 */
const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    clearLoading: (state) => {
      state.isLoading = false;
    },
    clearUser: (state) => {
      state.currentUser = {
        email: "",
        firstName: "",
        lastName: "",
      };
      state.jwtToken = "";
      state.error = {
        status: "",
        message: "",
      };
      state.isLoading = false;
      removeToken();
    },
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
      storeToken(payload.jwtToken);
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
      removeToken();
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
      storeToken(payload.jwtToken);
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
      removeToken();
    },
  },
});

export const {
  clearLoading: clearLoadingAction,
  clearUser: clearUserAction,
  login: userLoginAction,
  loginSuccess: userLoginSuccessAction,
  loginFail: userLoginFailAction,
  register: userRegisterAction,
  registerSuccess: userRegisterSuccessAction,
  registerFail: userRegisterFailAction,
} = userSlice.actions;

export default userSlice.reducer;
