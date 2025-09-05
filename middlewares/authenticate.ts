import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { access_token: token } = req.cookies;

    if (!token) {
      throw new Error("Forbidden!");
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET!);

    (req as any).user = payload;

    next();
  } catch (error) {
    console.log(error);
    res.status(403).send("Forbidden!");
  }
};
