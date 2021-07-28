// API Return Data
export type userFetchedData<TData, TError> = {
  data: TData;
  error: TError;
};

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
