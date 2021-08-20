import { RootState } from "../../rootReducer";

export const selectSnapshotsById = (state: RootState) => state.snapshots.byId;
export const selectSnapshotsDashboardIds = (state: RootState) =>
  state.snapshots.dashboardIds;
export const selectSnapshotsAllIds = (state: RootState) =>
  state.snapshots.allIds;
export const selectSnapshotErrors = (state: RootState) => state.snapshots.error;
export const selectSnapshotErrorStatus = (state: RootState) =>
  state.snapshots.error.status;
export const selectSnapshotErrorMessage = (state: RootState) =>
  state.snapshots.error.message;
export const selectSnapshotLoading = (state: RootState) =>
  state.snapshots.isLoading;
