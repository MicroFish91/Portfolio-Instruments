import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AccountsDashboardReducer,
  AccountsPaginateReducer,
  AccountsReducerState,
} from "./types";

const INITIAL_STATE: AccountsReducerState = {
  byId: {},
  dashboardIds: [],
  allIds: [],
};

const accountSlice = createSlice({
  name: "accounts",
  initialState: INITIAL_STATE,
  reducers: {
    clearAccounts: (state) => {
      state.byId = {};
      state.dashboardIds = [];
      state.allIds = [];
    },
    setDashboardAccounts: (
      state,
      { payload }: PayloadAction<AccountsDashboardReducer>
    ) => {
      state.byId = { ...state.byId, ...payload.byId };
      state.dashboardIds = payload.dashboardIds;
    },
    setPaginatedAccounts: (
      state,
      { payload }: PayloadAction<AccountsPaginateReducer>
    ) => {
      state.byId = { ...state.byId, ...payload.byId };
      state.allIds = payload.allIds;
    },
  },
});

export const {
  setDashboardAccounts: setDashboardAccountsAction,
  setPaginatedAccounts: setPaginatedAccountsAction,
  clearAccounts: clearAccountsAction,
} = accountSlice.actions;

export default accountSlice.reducer;
