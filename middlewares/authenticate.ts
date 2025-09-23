import type { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/user";
import { CustomError } from "../utils/CustomError";

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { access_token: token } = req.cookies;

    if (!token) {
      throw new CustomError("Forbidden!", 403);
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET!);

    req.user = payload;

    next();
  } catch (error) {
    next(error);
  }
};

// export const authorize = (role: string) => {
//   return (req: AuthRequest, res: Response, next: NextFunction) => {
//     if (role === req.user.role) {
//       return next();
//     } else {
//       res.status(401).send("Unauthorized");
//     }
//   };
// };

export const authorize = (roles: string | string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const allowedRoles = Array.isArray(roles) ? roles : [roles]

    if (req.user && allowedRoles.includes(req.user.role)) {
      return next()
    }

    return res.status(401).send("Unauthorized")
  }
}
