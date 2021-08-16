import {
  AccountsDashboardReducer,
  AccountsPaginateReducer,
} from "../../../Accounts/types";
import {
  IncomingPaginateSnapshotsFetchRaw,
  IncomingSnapshotFetchRaw,
} from "../../types";

export const toClientDashboard = (
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

export const toClientPaginate = (
  serverSnapshot: IncomingPaginateSnapshotsFetchRaw
): AccountsPaginateReducer => {
  const reducedAccounts: AccountsPaginateReducer = {
    byId: {},
    allIds: [],
  };

  serverSnapshot.data.forEach((snapshot) => {
    snapshot.Accounts.forEach((account) => {
      reducedAccounts.byId[account.id] = {
        location: account.location,
        type: account.type,
        snapshotId: account.snapshotId,
      };
      reducedAccounts.allIds.push(account.id.toString());
    });
  });

  return reducedAccounts;
};
