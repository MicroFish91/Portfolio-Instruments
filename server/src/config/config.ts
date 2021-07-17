import dotenv from "dotenv";

dotenv.config();

export const DB_USERNAME = process.env.DB_USERNAME || "postgres";
export const DB_PASSWORD = process.env.DB_PASSWORD || null;
export const DB_TITLE = process.env.DB_TITLE || "Portfolio_Instruments";
