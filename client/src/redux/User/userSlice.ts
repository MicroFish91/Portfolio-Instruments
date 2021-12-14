import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ChangeNotificationForm,
  ChangePasswordForm,
  LoginForm,
  RegistrationForm,
} from "../../validation/types";
import { CurrentUser, UserError } from "./types";
import { removeToken, storeToken } from "./userUtils";

const INITIAL_STATE: {
  currentUser: CurrentUser;
  jwtToken: string;
  error: { field: string; status: string; message: string };
  isLoading: boolean;
  isLoadingField: string;
} = {
  currentUser: {
    email: "",
    firstName: "",
    lastName: "",
    customBenchmark: null,
    rebalanceThreshold: 10,
    vpThreshold: 0,
  },
  jwtToken: "",
  error: {
    field: "",
    status: "",
    message: "",
  },
  isLoading: false,
  isLoadingField: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    clearError: (state) => {
      state.error = {
        field: "",
        status: "",
        message: "",
      };
      state.isLoading = false;
      state.isLoadingField = "";
    },
    clearLoading: (state) => {
      state.isLoading = false;
      state.isLoadingField = "";
    },
    clearUser: (state) => {
      state.currentUser = {
        email: "",
        firstName: "",
        lastName: "",
        customBenchmark: null,
        rebalanceThreshold: 10,
        vpThreshold: 0,
      };
      state.jwtToken = "";
      state.error = {
        field: "",
        status: "",
        message: "",
      };
      state.isLoading = false;
      state.isLoadingField = "";
      removeToken();
    },
    changePassword: (state, _action: PayloadAction<ChangePasswordForm>) => {
      state.isLoading = true;
      state.isLoadingField = "changePassword";
    },
    changePasswordFail: (state, { payload }: PayloadAction<UserError>) => {
      state.error = {
        field: "changePassword",
        status: payload?.status ? payload.status.toString() : "",
        message: payload?.message ? payload.message : "",
      };
      state.isLoading = false;
      state.isLoadingField = "";
    },
    changeNotifications: (
      state,
      _action: PayloadAction<ChangeNotificationForm>
    ) => {
      state.isLoading = true;
      state.isLoadingField = "changeNotifications";
    },
    changeNotificationsSuccess: (
      state,
      {
        payload,
      }: PayloadAction<{ rebalanceThreshold: number; vpThreshold: number }>
    ) => {
      state.currentUser.rebalanceThreshold = payload.rebalanceThreshold;
      state.currentUser.vpThreshold = payload.vpThreshold;
      state.error = {
        field: "",
        status: "",
        message: "",
      };
      state.isLoading = false;
      state.isLoadingField = "";
    },
    changeNotificationsFail: (state, { payload }: PayloadAction<UserError>) => {
      state.error = {
        field: "changeNotifications",
        status: payload?.status ? payload.status.toString() : "",
        message: payload?.message ? payload.message : "",
      };
      state.isLoading = false;
      state.isLoadingField = "";
    },
    login: (state, _action: PayloadAction<LoginForm>) => {
      state.isLoading = true;
      state.isLoadingField = "login";
    },
    loginSuccess: (
      state,
      { payload }: PayloadAction<{ currentUser: CurrentUser; jwtToken: string }>
    ) => {
      state.currentUser = payload.currentUser;
      state.jwtToken = payload.jwtToken;
      state.error = {
        field: "",
        status: "",
        message: "",
      };
      state.isLoading = false;
      state.isLoadingField = "";
      storeToken(payload.jwtToken);
    },
    loginFail: (state, { payload }: PayloadAction<UserError>) => {
      state.currentUser = {
        email: payload.email,
        firstName: "",
        lastName: "",
        customBenchmark: null,
        rebalanceThreshold: 10,
        vpThreshold: 0,
      };
      state.jwtToken = "";
      state.error = {
        field: "login",
        status: payload?.status ? payload.status.toString() : "",
        message: payload?.message ? payload.message : "",
      };
      state.isLoading = false;
      state.isLoadingField = "";
      removeToken();
    },
    register: (state, _action: PayloadAction<RegistrationForm>) => {
      state.isLoading = true;
      state.isLoadingField = "register";
    },
    registerSuccess: (state, { payload }: PayloadAction<{ email: string }>) => {
      state.currentUser = {
        email: payload.email,
        firstName: "",
        lastName: "",
        customBenchmark: null,
        rebalanceThreshold: 10,
        vpThreshold: 0,
      };
      state.jwtToken = "";
      state.error = {
        field: "",
        status: "",
        message: "",
      };
      state.isLoading = false;
      state.isLoadingField = "";
    },
    registerFail: (state, { payload }: PayloadAction<UserError>) => {
      state.currentUser = {
        email: payload.email,
        firstName: "",
        lastName: "",
        customBenchmark: null,
        rebalanceThreshold: 10,
        vpThreshold: 0,
      };
      state.jwtToken = "";
      state.error = {
        field: "register",
        status: payload?.status ? payload.status.toString() : "",
        message: payload?.message ? payload.message : "",
      };
      state.isLoading = false;
      state.isLoadingField = "";
      removeToken();
    },
    resetPassword: (state, _action: PayloadAction<{ email: string }>) => {
      state.isLoading = true;
      state.isLoadingField = "resetPassword";
    },
    resetPasswordSuccess: (state) => {
      state.isLoading = false;
      state.isLoadingField = "";
    },
    resetPasswordFail: (state, { payload }: PayloadAction<UserError>) => {
      state.error = {
        field: "resetPassword",
        status: payload?.status ? payload.status.toString() : "",
        message: payload?.message ? payload.message : "",
      };
      state.isLoading = false;
      state.isLoadingField = "";
    },
  },
});

export const {
  clearError: clearUserErrorAction,
  clearLoading: clearUserLoadingAction,
  clearUser: clearUserAction,
  changePassword: userchangePasswordAction,
  changePasswordFail: userChangePasswordFailAction,
  changeNotifications: userChangeNotificationsAction,
  changeNotificationsSuccess: userChangeNotificationSuccessAction,
  changeNotificationsFail: userChangeNotificationsFailAction,
  login: userLoginAction,
  loginSuccess: userLoginSuccessAction,
  loginFail: userLoginFailAction,
  register: userRegisterAction,
  registerSuccess: userRegisterSuccessAction,
  registerFail: userRegisterFailAction,
  resetPassword: userResetPasswordAction,
  resetPasswordSuccess: userResetPasswordSuccessAction,
  resetPasswordFail: userResetPasswordFailAction,
} = userSlice.actions;

export default userSlice.reducer;
