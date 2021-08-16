import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  HoldingsDashboardReducer,
  HoldingsPaginateReducer,
  HoldingsReducerState,
} from "./types";

const INITIAL_STATE: HoldingsReducerState = {
  byId: {},
  dashboardIds: [],
  allIds: [],
};

const HoldingSlice = createSlice({
  name: "holdings",
  initialState: INITIAL_STATE,
  reducers: {
    setDashboardHoldings: (
      state,
      { payload }: PayloadAction<HoldingsDashboardReducer>
    ) => {
      state.byId = { ...state.byId, ...payload.byId };
      state.dashboardIds = payload.dashboardIds;
    },
    setPaginateHoldings: (
      state,
      { payload }: PayloadAction<HoldingsPaginateReducer>
    ) => {
      state.byId = { ...state.byId, ...payload.byId };
      state.allIds = payload.allIds;
    },
    clearHoldings: (state) => {
      state.byId = {};
      state.dashboardIds = [];
      state.allIds = [];
    },
  },
});

export const {
  setDashboardHoldings: setDashboardHoldingsAction,
  setPaginateHoldings: setPaginateHoldingsAction,
  clearHoldings: clearHoldingsAction,
} = HoldingSlice.actions;

export default HoldingSlice.reducer;
