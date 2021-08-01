import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";
import { consolidateSnapshotsMonthlyById } from "./workers/consolidateSnapshots";
import { convertIdsToTotals } from "./workers/convertIdsToTotals";
import { createXAxisLabels } from "./workers/createXAxisLabels";

export const selectSnapshotsById = (state: RootState) => state.snapshots.byId;
export const selectSnapshotsIdList = (state: RootState) =>
  state.snapshots.allIds;
export const selectSnapshotErrors = (state: RootState) => state.snapshots.error;
export const selectSnapshotLoading = (state: RootState) =>
  state.snapshots.isLoading;

export const selectXAxisLabels = createXAxisLabels();

export const selectLineChartValuesRangeOne = createSelector(
  selectSnapshotsById,
  selectSnapshotsIdList,
  (snapshotsById, snapshotsList) => {
    const snapshotIdsByMonth = consolidateSnapshotsMonthlyById(
      snapshotsById,
      snapshotsList
    );
    const rangeOneValues = convertIdsToTotals(
      snapshotsById,
      snapshotIdsByMonth
    );
    return rangeOneValues;
  }
);

export const selectLineChartValuesRangeTwo = createSelector(
  selectSnapshotsById,
  selectSnapshotsIdList,
  (snapshotsById, snapshotsList) => {
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
  }
);
