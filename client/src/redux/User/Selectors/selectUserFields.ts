import { RootState } from "../../rootReducer";

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
