import { NextFunction, Request, Response } from "express";

export type AsyncProcess = (req: Request, res: Response) => any;

export const asyncMiddleware = (asyncProcess: AsyncProcess) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await asyncProcess(req, res);
    } catch (err) {
      next(err);
    }
  };
};
