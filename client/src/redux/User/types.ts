import { GenericError } from "../api/types";

// Reducer State
export interface CurrentUser {
  email: string;
  firstName: string;
  lastName: string;
}

export type UserError = GenericError;
