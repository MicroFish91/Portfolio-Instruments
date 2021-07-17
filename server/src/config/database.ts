import { DB_PASSWORD, DB_TITLE, DB_USERNAME } from "./config";

export const development = {
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_TITLE,
  host: "127.0.0.1",
  dialect: "postgres",
};
