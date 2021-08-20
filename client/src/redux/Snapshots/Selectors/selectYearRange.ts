import { createSelector } from "@reduxjs/toolkit";
import { createYearRange } from "../utils";
import { selectSnapshotsDashboardIds } from "./selectSnapshotFields";

export const selectYearRangeOne = createSelector(
  selectSnapshotsDashboardIds,
  (snapshotsList) => {
    if (snapshotsList.length !== 0) {
      return createYearRange();
    } else {
      return null;
    }
  }
);

export const selectYearRangeTwo = createSelector(
  selectSnapshotsDashboardIds,
  (snapshotsList) => {
    if (snapshotsList.length !== 0) {
      return createYearRange(24);
    } else {
      return null;
    }
  }
);
