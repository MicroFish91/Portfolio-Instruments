import { createSelector } from "@reduxjs/toolkit";
import { selectBenchmarkErrorStatus } from "../Benchmarks/benchmarkSelector";
import { RootState } from "../rootReducer";
import { selectSnapshotErrorStatus } from "../Snapshots/snapshotSelector";
import { getToken } from "./userUtils";

export const selectUserEmail = (state: RootState) =>
  state.user.currentUser.email;
export const selectUserFirstName = (state: RootState) =>
  state.user.currentUser.firstName;
export const selectUserLastName = (state: RootState) =>
  state.user.currentUser.lastName;
export const selectUserRebalanceThreshold = (state: RootState) =>
  state.user.currentUser.rebalanceThreshold;
export const selectUserVpThreshold = (state: RootState) =>
  state.user.currentUser.vpThreshold;
export const selectUserToken = (state: RootState) => state.user.jwtToken;
export const selectUserErrorField = (state: RootState) =>
  state.user.error.field;
export const selectUserErrorStatus = (state: RootState) =>
  state.user.error.status;
export const selectUserErrorMessage = (state: RootState) =>
  state.user.error.message;
export const selectUserLoading = (state: RootState) => state.user.isLoading;
export const selectUserLoadingField = (state: RootState) =>
  state.user.isLoadingField;

export const selectUserFullName = createSelector(
  selectUserFirstName,
  selectUserLastName,
  (firstName, lastName) => `${firstName} ${lastName}`
);

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

export const selectCustomUserErrorMessage = createSelector(
  selectUserErrorStatus,
  selectUserErrorMessage,
  (status, message) => {
    if (status === "401") {
      return "Invalid login credentials.";
    } else if (status === "403") {
      return "Email confirmation required. Resend verification option below.";
    } else if (status === "404") {
      return "Data not found, please try again later.";
    } else if (status === "500") {
      return "Unexpected server error.";
    } else {
      return message;
    }
  }
);
