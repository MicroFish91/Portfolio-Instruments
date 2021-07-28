import { RootState } from "../rootReducer";

export const selectUserErrorStatus = (state: RootState) =>
  state.user.error.status;
export const selectUserErrorMessage = (state: RootState) =>
  state.user.error.message;
export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectUserToken = (state: RootState) => state.user.jwtToken;
export const selectUserLoading = (state: RootState) => state.user.isLoading;
