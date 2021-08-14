import { AccountsDashboardReducer } from "../../../Accounts/types";
import { IncomingSnapshotFetchRaw } from "../../types";

export const toClient = (
  serverSnapshot: IncomingSnapshotFetchRaw
): AccountsDashboardReducer => {
  const reducedAccounts: AccountsDashboardReducer = {
    byId: {},
    dashboardIds: [],
  };

  serverSnapshot.data.Accounts?.forEach((account) => {
    reducedAccounts.byId[account.id] = {
      location: account.location,
      type: account.type,
      snapshotId: account.snapshotId,
    };
    reducedAccounts.dashboardIds.push(account.id.toString());
  });

  return reducedAccounts;
};
