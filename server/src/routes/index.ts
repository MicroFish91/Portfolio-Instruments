import { Express } from "express";
import authRouter from "./auth";
import benchmarksRouter from "./benchmarks";
import logsRouter from "./logs";
import snapshotsRouter from "./snapshots";

export const combineRouter = (app: Express): void => {
  app.use("/api", authRouter);
  app.use("/api/benchmarks", benchmarksRouter);
  app.use("/api/snapshots", snapshotsRouter);
  app.use("/api/logs", logsRouter);
};
