import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  PostSnapshot,
  SnapshotsDashboardReducerSuccess,
  SnapshotsError,
  SnapshotsPaginatedReducerSuccess,
  SnapshotsReducerState,
} from "./types";

const INITIAL_STATE: SnapshotsReducerState = {
  byId: {},
  dashboardIds: [],
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
    initDashboardSnapshots: (state) => {
      state.isLoading = true;
    },
    initPaginatedSnapshots: (state) => {
      state.isLoading = true;
    },
    postSnapshot: (state, _action: PayloadAction<PostSnapshot>) => {
      state.isLoading = true;
    },
    clearSnapshots: (state) => {
      state.byId = {};
      state.dashboardIds = [];
      state.allIds = [];
      state.error = {
        status: "",
        message: "",
      };
      state.isLoading = false;
    },
    setDashboardSnapshotsSuccess: (
      state,
      { payload }: PayloadAction<SnapshotsDashboardReducerSuccess>
    ) => {
      state.byId = { ...state.byId, ...payload.byId };
      state.dashboardIds = payload.dashboardIds;
      state.error = {
        status: "",
        message: "",
      };
      state.isLoading = false;
    },
    setPaginatedSnapshotsSuccess: (
      state,
      { payload }: PayloadAction<SnapshotsPaginatedReducerSuccess>
    ) => {
      state.byId = { ...state.byId, ...payload.byId };
      state.allIds = payload.allIds;
      state.error = {
        status: "",
        message: "",
      };
      state.isLoading = false;
    },
    setSnapshotsFail: (state, { payload }: PayloadAction<SnapshotsError>) => {
      state.byId = {};
      state.dashboardIds = [];
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
  initDashboardSnapshots: initDashboardSnapshotsAction,
  initPaginatedSnapshots: initPaginatedSnapshotsAction,
  clearSnapshots: clearSnapshotsAction,
  postSnapshot: postSnapshotAction,
  setDashboardSnapshotsSuccess: setDashboardSnapshotsSuccessAction,
  setPaginatedSnapshotsSuccess: setPaginatedSnapshotsSuccessAction,
  setSnapshotsFail: setSnapshotsFailAction,
} = snapshotSlice.actions;

export default snapshotSlice.reducer;
