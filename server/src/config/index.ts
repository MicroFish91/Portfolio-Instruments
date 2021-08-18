import dotenv from "dotenv";

dotenv.config();

export { database } from "./database";
export { emailer } from "./emailer";
export { secrets } from "./secrets";
export const CLIENT_BASE_URL =
  process.env.CLIENT_BASE_URL || "http://localhost:3000";
export const SERVER_BASE_URL =
  process.env.SERVER_BASE_URL || "http://localhost:3001";
