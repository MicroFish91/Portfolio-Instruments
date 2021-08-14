import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  PostSnapshot,
  SnapshotsError,
  SnapshotsReducerState,
  SnapshotsReducerSuccess,
} from "./types";

const INITIAL_STATE: SnapshotsReducerState = {
  byId: {},
  allIds: [],
  error: {
    status: "",
    message: "",
  },
  isLoading: false,
};

const snapshotSlice = createSlice({
  name: "snapshots",
  initialState: INITIAL_STATE,
  reducers: {
    initSnapshots: (state) => {
      state.isLoading = true;
    },
    postSnapshot: (state, _action: PayloadAction<PostSnapshot>) => {
      state.isLoading = true;
    },
    clearSnapshots: (state) => {
      state.byId = {};
      state.allIds = [];
      state.error = {
        status: "",
        message: "",
      };
      state.isLoading = false;
    },
    setSnapshotsSuccess: (
      state,
      { payload }: PayloadAction<SnapshotsReducerSuccess>
    ) => {
      state.byId = payload.byId;
      state.allIds = payload.allIds;
      state.error = {
        status: "",
        message: "",
      };
      state.isLoading = false;
    },
    setSnapshotsFail: (state, { payload }: PayloadAction<SnapshotsError>) => {
      state.byId = {};
      state.allIds = [];
      state.error = {
        status: payload?.status ? payload.status.toString() : "",
        message: payload?.message ? payload.message : "",
      };
      state.isLoading = false;
    },
  },
});

export const {
  initSnapshots: initSnapshotsAction,
  clearSnapshots: clearSnapshotsAction,
  postSnapshot: postSnapshotAction,
  setSnapshotsSuccess: setSnapshotsSuccessAction,
  setSnapshotsFail: setSnapshotsFailAction,
} = snapshotSlice.actions;

export default snapshotSlice.reducer;
