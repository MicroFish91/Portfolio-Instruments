import { CurrentUser } from "../User/types";

// API General Cleaned Format
export type FetchedData<TData, TError> = {
  data: TData;
  error: TError;
};

// * User
// Inbound
export type IncomingUserLoginFetchRaw = {
  data: { token: string; currentUser: CurrentUser };
};

export type IncomingUserRegistrationFetchRaw = {
  data: { token: string };
};

export type IncomingUserFetchStandardized = FetchedData<
  { jwtToken: string; currentUser: CurrentUser } | null,
  { status: string; message: string } | null
>;
