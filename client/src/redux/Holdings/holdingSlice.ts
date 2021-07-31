import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HoldingsReducerState } from "./types";

const INITIAL_STATE: HoldingsReducerState = {
  byId: {},
  allIds: [],
};

const HoldingSlice = createSlice({
  name: "holdings",
  initialState: INITIAL_STATE,
  reducers: {
    setHoldings: (state, { payload }: PayloadAction<HoldingsReducerState>) => {
      state.byId = payload.byId;
      state.allIds = payload.allIds;
    },
    clearHoldings: (state) => {
      state.byId = {};
      state.allIds = [];
    },
  },
});

export const {
  setHoldings: setHoldingsAction,
  clearHoldings: clearHoldingsAction,
} = HoldingSlice.actions;

export default HoldingSlice.reducer;
