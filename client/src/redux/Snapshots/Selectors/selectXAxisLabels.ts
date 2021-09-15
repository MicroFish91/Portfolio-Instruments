import { createSelector } from "@reduxjs/toolkit";
import { createXAxisLabels } from "../utils";
import { selectSnapshotsDashboardIds } from "./selectSnapshotFields";

export const selectXAxisLabels = createSelector(
  selectSnapshotsDashboardIds,
  (snapshotsList) => {
    if (snapshotsList.length !== 0) {
      return createXAxisLabels();
    } else {
      return null;
    }
  }
);
