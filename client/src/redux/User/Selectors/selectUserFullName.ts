import { createSelector } from "@reduxjs/toolkit";
import { selectUserFirstName, selectUserLastName } from "./selectUserFields";

export const selectUserFullName = createSelector(
  selectUserFirstName,
  selectUserLastName,
  (firstName, lastName) => `${firstName} ${lastName}`
);
