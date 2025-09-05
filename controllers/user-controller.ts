import User from "../models/user-model.js";
import type { Request, Response, NextFunction } from "express";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const findUser = await User.findOne({ email });

    if (findUser) {
      res.status(400).json({ message: "User already exists!" });
      return 
    }

    const user = await User.create({
      email,
      password,
    });

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
};
