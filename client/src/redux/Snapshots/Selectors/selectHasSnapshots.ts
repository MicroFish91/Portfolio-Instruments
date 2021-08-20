import { createSelector } from "@reduxjs/toolkit";
import { selectSnapshotsDashboardIds } from "./selectSnapshotFields";

export const selectHasSnapshots = createSelector(
  selectSnapshotsDashboardIds,
  (snapshotIds) => {
    if (snapshotIds.length) {
      return true;
    } else {
      return false;
    }
  }
);
