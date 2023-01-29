const baseUrl: string = 'https://api.portfolioinstruments.com';

// API Endpoints
export const USER_ENDPOINT = {
  LOGIN: `${baseUrl}/api/login`,
  REGISTER: `${baseUrl}/api/register`,
  EMAIL_CONFIRMATION: `${baseUrl}/api/confirmation`,
  CHANGE_NOTIFICATIONS: `${baseUrl}/api/changeNotifications`,
  CHANGE_PASSWORD: `${baseUrl}/api/changePassword`,
  RESET_PASSWORD: `${baseUrl}/api/resetPassword`,
  DELETE_USER: `${baseUrl}/api/deleteUser`,
};

export const SNAPSHOT_ENDPOINT = {
  GET_LATEST: `${baseUrl}/api/snapshots/latest`,
  GET_RANGE: (years: number) => `${baseUrl}/api/snapshots/range/${years}`,
  GET_ALL: `${baseUrl}/api/snapshots/all`,
  POST_SNAPSHOT: `${baseUrl}/api/snapshots`,
  DELETE_SNAPSHOT: `${baseUrl}api/snapshots`,
};

export const BENCHMARK_ENDPOINT = {
  GET_BENCHMARK: `${baseUrl}/api/benchmarks`,
  SET_BENCHMARK: `${baseUrl}/api/benchmarks`,
  GET_CUSTOM_BENCHMARK: `${baseUrl}/api/benchmarks/custom`,
  SET_CUSTOM_BENCHMARK: `${baseUrl}/api/benchmarks/custom`,
  REMOVE_FROM_CUSTOM: `${baseUrl}/api/benchmarks/custom`,
};

export const LOG_ENDPOINT = {
  GET_RECORDS_JSON: (years: string) => `${baseUrl}/api/logs/records/json/${years}`,
};