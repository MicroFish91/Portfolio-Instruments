import dotenv from "dotenv";

dotenv.config();

export const secrets = {
  JWT_SECRET: process.env.JWT_SECRET || "myJwtSecret",
  EMAIL_SECRET: process.env.EMAIL_SECRET || "myEmailSecret",
};
