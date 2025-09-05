import type { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/user";

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { access_token: token } = req.cookies;

    if (!token) {
      throw new Error("Forbidden!");
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET!);

    req.user = payload;

    next();
  } catch (error) {
    console.log(error);
    res.status(403).send("Forbidden!");
  }
};
