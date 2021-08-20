import { createSelector } from "@reduxjs/toolkit";
import {
  selectUserErrorMessage,
  selectUserErrorStatus,
} from "./selectUserFields";

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
