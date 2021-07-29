import { Express } from "express";
import authRouter from "./auth";
import snapshotsRouter from "./snapshots";

export const combineRouter = (app: Express): void => {
  app.use(authRouter);
  app.use("/snapshots", snapshotsRouter);
};
