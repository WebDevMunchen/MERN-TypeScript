import { Request, Response, NextFunction } from "express";

type ExpressReqestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any> | void;

export const asyncWrapper = (requestHandler: ExpressReqestHandler) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await requestHandler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
