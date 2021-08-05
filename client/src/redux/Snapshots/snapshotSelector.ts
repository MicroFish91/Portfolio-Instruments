import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";
import {
  consolidateSnapshotsMonthlyById,
  convertIdsToTotals,
  createXAxisLabels,
  createYearRange,
} from "./workers";

export const selectSnapshotsById = (state: RootState) => state.snapshots.byId;
export const selectSnapshotsIdList = (state: RootState) =>
  state.snapshots.allIds;
export const selectSnapshotErrors = (state: RootState) => state.snapshots.error;
export const selectSnapshotLoading = (state: RootState) =>
  state.snapshots.isLoading;

export const selectXAxisLabels = createSelector(
  selectSnapshotsIdList,
  (snapshotsList) => {
    if (snapshotsList.length !== 0) {
      return createXAxisLabels();
    } else {
      return null;
    }
  }
);

export const selectYearRangeOne = createSelector(
  selectSnapshotsIdList,
  (snapshotsList) => {
    if (snapshotsList.length !== 0) {
      return createYearRange();
    } else {
      return null;
    }
  }
);

export const selectYearRangeTwo = createSelector(
  selectSnapshotsIdList,
  (snapshotsList) => {
    if (snapshotsList.length !== 0) {
      return createYearRange(24);
    } else {
      return null;
    }
  }
);

export const selectLineChartValuesRangeOne = createSelector(
  selectSnapshotsById,
  selectSnapshotsIdList,
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
  selectSnapshotsIdList,
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
