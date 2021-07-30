import { GenericError } from "../api/endpoints/types";

// Reducer State
export interface CurrentUser {
  email: string;
  firstName: string;
  lastName: string;
}

export type UserError = GenericError;
