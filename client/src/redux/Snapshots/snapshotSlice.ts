import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  PostSnapshot,
  removeSnapshotPayload,
  SnapshotsDashboardReducerSuccess,
  SnapshotsError,
  SnapshotsPaginateReducerSuccess,
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
    initPaginateSnapshots: (state) => {
      state.isLoading = true;
    },
    postSnapshot: (state, _action: PayloadAction<PostSnapshot>) => {
      state.isLoading = true;
    },
    removeSnapshot: (state, _action: PayloadAction<removeSnapshotPayload>) => {
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
    setPaginateSnapshotsSuccess: (
      state,
      { payload }: PayloadAction<SnapshotsPaginateReducerSuccess>
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
  initPaginateSnapshots: initPaginateSnapshotsAction,
  removeSnapshot: removeSnapshotAction,
  clearSnapshots: clearSnapshotsAction,
  postSnapshot: postSnapshotAction,
  setDashboardSnapshotsSuccess: setDashboardSnapshotsSuccessAction,
  setPaginateSnapshotsSuccess: setPaginateSnapshotsSuccessAction,
  setSnapshotsFail: setSnapshotsFailAction,
} = snapshotSlice.actions;

export default snapshotSlice.reducer;
