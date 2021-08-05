import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccountsReducerState } from "./types";

const INITIAL_STATE: AccountsReducerState = {
  byId: {},
  allIds: [],
};

const accountSlice = createSlice({
  name: "accounts",
  initialState: INITIAL_STATE,
  reducers: {
    clearAccounts: (state) => {
      state.byId = {};
      state.allIds = [];
    },
    setAccounts: (state, { payload }: PayloadAction<AccountsReducerState>) => {
      state.byId = payload.byId;
      state.allIds = payload.allIds;
    },
  },
});

export const {
  setAccounts: setAccountsAction,
  clearAccounts: clearAccountsAction,
} = accountSlice.actions;

export default accountSlice.reducer;
