import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";

export const selectUserEmail = (state: RootState) =>
  state.user.currentUser.email;
export const selectUserFirstName = (state: RootState) =>
  state.user.currentUser.firstName;
export const selectUserLastName = (state: RootState) =>
  state.user.currentUser.lastName;
export const selectUserToken = (state: RootState) => state.user.jwtToken;
export const selectUserErrorStatus = (state: RootState) =>
  state.user.error.status;
export const selectUserErrorMessage = (state: RootState) =>
  state.user.error.message;
export const selectUserLoading = (state: RootState) => state.user.isLoading;

export const selectUserFullName = createSelector(
  selectUserFirstName,
  selectUserLastName,
  (firstName, lastName) => `${firstName} ${lastName}`
);

export const selectCustomUserErrorMessage = createSelector(
  selectUserErrorStatus,
  selectUserErrorMessage,
  (status, message) => {
    if (status === "401") {
      return "Invalid login credentials.";
    } else if (status === "404") {
      return "Data not found, please try again later.";
    } else if (status === "500") {
      return "Unexpected server error.";
    } else {
      return message;
    }
  }
);
