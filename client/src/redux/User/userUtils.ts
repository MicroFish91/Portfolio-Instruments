export const getToken = (): string | null => {
  if (localStorage?.token) {
    return localStorage.token;
  } else {
    return null;
  }
};

export const storeToken = (token: string) => {
  localStorage.token = token;
};

export const removeToken = () => {
  delete localStorage.token;
};
