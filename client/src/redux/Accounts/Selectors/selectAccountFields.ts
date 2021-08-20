import { RootState } from "../../rootReducer";

export const selectAccountsById = (state: RootState) => state.accounts.byId;
export const selectAccountsDashboardIds = (state: RootState) =>
  state.accounts.dashboardIds;
export const selectAccountsAllIds = (state: RootState) => state.accounts.allIds;
