import dotenv from "dotenv";

dotenv.config();

export const emailer = {
  GMAIL_USER: process.env.GMAIL_USER,
  GMAIL_PASS: process.env.GMAIL_PASS,
};
