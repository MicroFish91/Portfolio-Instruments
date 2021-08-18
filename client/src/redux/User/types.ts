import { GenericError } from "../api/types";

// Reducer State
export interface CurrentUser {
  email: string;
  firstName: string;
  lastName: string;
  rebalanceThreshold: number;
  vpThreshold: number;
}

export type UserError = GenericError & { email: string };
