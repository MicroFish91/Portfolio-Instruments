import { CurrentUser } from "../User/types";

// * API Incoming - General Std. Format
export type FetchedData<TData, TError> = {
  data: TData;
  error: TError;
};

export type GenericError = {
  status: string;
  message: string;
};

// ! User
// * Incoming
export type IncomingUserLoginFetchRaw = {
  data: { token: string; currentUser: CurrentUser };
};

export type IncomingUserRegistrationFetchRaw = {
  data: { token: string };
};

export type IncomingUserFetchStandardized = FetchedData<
  { jwtToken: string; currentUser: CurrentUser } | null,
  GenericError | null
>;

// * Outgoing

// ! Snapshots
// * Incoming
export type IncomingSnapshotFetchRaw = {
  data: IncomingSnapshotRaw;
};

export type IncomingSnapshotsFetchRaw = {
  data: IncomingSnapshotRaw[];
};

export type IncomingSnapshotsFetchStandardized = FetchedData<
  IncomingSnapshotFetchRaw | IncomingSnapshotsFetchRaw | null,
  GenericError | null
>;

export type IncomingSnapshotRaw = {
  id: number;
  title: string;
  benchmark: string;
  notes: string;
  Accounts?: IncomingAccountRaw[];
  userId: number;
  specifiedDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

// * Outgoing

// ! Accounts
// * Incoming
export type IncomingAccountRaw = {
  id: number;
  location: string;
  type: "Taxable" | "Roth" | "Traditional";
  snapshotId: number;
  Holdings?: IncomingHoldingRaw[];
  createdAt: Date;
  updatedAt: Date;
};

// * Outgoing

// ! Holdings
// * Incoming
export type IncomingHoldingRaw = {
  id: number;
  title: string;
  ticker: string;
  category: string;
  total: number;
  expenseRatio: number;
  accountId: number;
  createdAt: Date;
  updatedAt: Date;
};

// * Outgoing
