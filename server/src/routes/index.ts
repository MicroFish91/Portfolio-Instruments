import { Express } from "express";
import authRouter from "./auth";
import benchmarksRouter from "./benchmarks";
import snapshotsRouter from "./snapshots";

export const combineRouter = (app: Express): void => {
  app.use(authRouter);
  app.use("/benchmarks", benchmarksRouter);
  app.use("/snapshots", snapshotsRouter);
};
