// Reducer State
export interface CurrentUser {
  email: string;
  firstName: string;
  lastName: string;
}

export interface UserError {
  status: string;
  message: string;
}
