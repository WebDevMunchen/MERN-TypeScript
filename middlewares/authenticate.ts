import type { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/user";
import { CustomError } from "../types/CustomError";

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { access_token: token } = req.cookies;

    if (!token) {
      const error: CustomError = new Error("Forbidden!") as CustomError;
      error.statusCode = 403;
      throw error;
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET!);

    req.user = payload;

    next();
  } catch (error) {
    next(error);
  }
};
