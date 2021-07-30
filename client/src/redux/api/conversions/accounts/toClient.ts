import { AccountsReducerState } from "../../../Accounts/types";
import { IncomingSnapshotFetchRaw } from "../../types";

export const toClient = (
  serverSnapshot: IncomingSnapshotFetchRaw
): AccountsReducerState => {
  const reducedAccounts: AccountsReducerState = {
    byId: {},
    allIds: [],
  };

  serverSnapshot.data.Accounts?.forEach((account) => {
    reducedAccounts.byId[account.id] = {
      location: account.location,
      type: account.type,
      snapshotId: account.snapshotId,
    };
    reducedAccounts.allIds.push(account.id.toString());
  });

  return reducedAccounts;
};
