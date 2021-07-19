import dotenv from "dotenv";

dotenv.config();

export interface Database {
  development: DatabaseConnection;
  production?: DatabaseConnection;
}

export interface DatabaseConnection {
  [x: string]: any;
  username: string;
  password: string | null;
  database: string;
  host: string;
  dialect: string;
}

export const database: Database = {
  development: {
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_TITLE || "Portfolio_Instruments",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};
