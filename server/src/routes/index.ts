import { Express } from "express";
import authRouter from "./auth";

export const combineRouter = (app: Express): void => {
  app.use(authRouter);
};
