// API Endpoints
export const USER_ENDPOINT = {
  LOGIN: "/login",
  REGISTER: "/register",
};

export const SNAPSHOT_ENDPOINT = {
  GET_LATEST: "/snapshots/latest",
  GET_RANGE: (years: number) => `/snapshots/range/${years}`,
};
