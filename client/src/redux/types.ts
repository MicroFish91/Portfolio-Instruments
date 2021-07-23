export type user = {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
};

export type action = {
  type: string;
  payload?: any;
};

export type fetchedData<TData, TError> = {
  data: TData;
  error: TError;
};
