import { RootState } from "../../rootReducer";

export const selectHoldingsById = (state: RootState) => state.holdings.byId;
export const selectHoldingsDashboardIds = (state: RootState) =>
  state.holdings.dashboardIds;
export const selectHoldingsAllIds = (state: RootState) => state.holdings.allIds;
