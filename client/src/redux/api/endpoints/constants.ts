// API Endpoints
export const USER_ENDPOINT = {
  LOGIN: "/api/login",
  REGISTER: "/api/register",
  EMAIL_CONFIRMATION: "/api/confirmation",
  CHANGE_NOTIFICATIONS: "/api/changeNotifications",
  CHANGE_PASSWORD: "/api/changePassword",
  RESET_PASSWORD: "/api/resetPassword",
};

export const SNAPSHOT_ENDPOINT = {
  GET_LATEST: "/api/snapshots/latest",
  GET_RANGE: (years: number) => `/api/snapshots/range/${years}`,
  GET_ALL: "/api/snapshots/all",
  POST_SNAPSHOT: "/api/snapshots",
  DELETE_SNAPSHOT: "/api/snapshots",
};

export const BENCHMARK_ENDPOINT = {
  GET_BENCHMARK: "/api/benchmarks",
  SET_BENCHMARK: "/api/benchmarks",
  GET_CUSTOM_BENCHMARK: "/api/benchmarks/custom",
  SET_CUSTOM_BENCHMARK: "/api/benchmarks/custom",
  REMOVE_FROM_CUSTOM: "/api/benchmarks/custom",
};

export const LOG_ENDPOINT = {
  GET_RECORDS_JSON: (years: string) => `/api/logs/records/json/${years}`,
};
