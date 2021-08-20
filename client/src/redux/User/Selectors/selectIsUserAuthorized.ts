import { createSelector } from "@reduxjs/toolkit";
import { selectBenchmarkErrorStatus } from "../../Benchmarks/Selectors/selectBenchmarkFields";
import { selectSnapshotErrorStatus } from "../../Snapshots/Selectors/selectSnapshotFields";
import { getToken } from "../userUtils";
import { selectUserErrorStatus, selectUserToken } from "./selectUserFields";

export const selectIsUserAuthorized = createSelector(
  selectUserToken,
  selectUserErrorStatus,
  selectSnapshotErrorStatus,
  selectBenchmarkErrorStatus,
  (reduxToken, userErrorStatus, snapshotErrorStatus, benchmarkErrorStatus) => {
    const storageToken = getToken();
    if (
      reduxToken &&
      storageToken &&
      userErrorStatus !== "401" &&
      snapshotErrorStatus !== "401" &&
      benchmarkErrorStatus !== "401"
    ) {
      return true;
    } else {
      return false;
    }
  }
);
