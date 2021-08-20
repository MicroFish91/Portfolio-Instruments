import { createSelector } from "@reduxjs/toolkit";
import { selectSnapshotLoading } from "../../Snapshots/Selectors";
import { selectUserLoading } from "../../User/Selectors";

export const selectIsDashboardLoading = createSelector(
  selectUserLoading,
  selectSnapshotLoading,
  (isUserLoading, isSnapshotLoading) => {
    if (isUserLoading || isSnapshotLoading) {
      return true;
    } else {
      return false;
    }
  }
);
