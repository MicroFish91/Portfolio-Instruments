import dotenv from "dotenv";

dotenv.config();

export * from "./database";
export * from "./emailer";
export * from "./secrets";
export const SERVER_BASE_URL =
  process.env.SERVER_BASE_URL || "http://localhost:3001";
