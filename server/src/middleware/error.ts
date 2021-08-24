import { NextFunction, Request, Response } from "express";
import logger from "../logger";
import { formatLogError } from "../logger/formatLogError";

// Generic error handling placeholder
export const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error({ message: formatLogError(err, "Error Middleware") });
  return res.status(500).json({ message: "Internal server error." });
};
