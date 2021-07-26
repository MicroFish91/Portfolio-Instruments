export type userLogin = {
  email: string;
  password: string;
};

export type userRegistration = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type user = {
  email: string;
  firstName: string;
  lastName: string;
};

export type action = {
  type: string;
  payload?: any;
};

export type userFetchedData<TData, TError> = {
  data: TData;
  error: TError;
};
