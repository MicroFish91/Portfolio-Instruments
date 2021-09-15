import { createSelector } from "@reduxjs/toolkit";
import { ReducedSnapshot } from "../types";
import {
  selectSnapshotsAllIds,
  selectSnapshotsById,
} from "./selectSnapshotFields";

export const selectAllSnapshots = createSelector(
  selectSnapshotsById,
  selectSnapshotsAllIds,
  (snapshotsById, snapshotsList) => {
    const newList: (ReducedSnapshot & { id: string })[] = [];

    snapshotsList.forEach((snapshotId) => {
      const newSnapshot = {
        ...snapshotsById[snapshotId],
        id: snapshotId,
      };
      newList.push(newSnapshot);
    });

    return newList;
  }
);
