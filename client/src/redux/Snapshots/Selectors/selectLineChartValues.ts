import { createSelector } from "@reduxjs/toolkit";
import { consolidateSnapshotsMonthlyById, convertIdsToTotals } from "../utils";
import {
  selectSnapshotsById,
  selectSnapshotsDashboardIds,
} from "./selectSnapshotFields";

export const selectLineChartValuesRangeOne = createSelector(
  selectSnapshotsById,
  selectSnapshotsDashboardIds,
  (snapshotsById, snapshotsList) => {
    const snapshotIdsByMonth = consolidateSnapshotsMonthlyById(
      snapshotsById,
      snapshotsList
    );
    if (snapshotsList.length !== 0) {
      const rangeOneValues = convertIdsToTotals(
        snapshotsById,
        snapshotIdsByMonth
      );
      return rangeOneValues;
    } else {
      return undefined;
    }
  }
);

export const selectLineChartValuesRangeTwo = createSelector(
  selectSnapshotsById,
  selectSnapshotsDashboardIds,
  (snapshotsById, snapshotsList) => {
    if (snapshotsList.length !== 0) {
      const snapshotIdsByMonth = consolidateSnapshotsMonthlyById(
        snapshotsById,
        snapshotsList,
        24
      );
      const rangeTwoValues = convertIdsToTotals(
        snapshotsById,
        snapshotIdsByMonth
      );
      return rangeTwoValues;
    } else {
      return undefined;
    }
  }
);
