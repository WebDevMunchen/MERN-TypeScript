import User from "../models/user-model";
import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/user";
import { CustomError } from "../types/CustomError";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const findUser = await User.findOne({ email });

    if (findUser) {
      const error: CustomError = new Error(
        "User already exists!"
      ) as CustomError;
      error.statusCode = 409;
      throw error;
    }

    const user = await User.create({
      email,
      password: hash,
    });

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      const error: CustomError = new Error("User not found!") as CustomError;
      error.statusCode = 404;
      throw error;
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      const error: CustomError = new Error(
        "Incorrect password!"
      ) as CustomError;
      error.statusCode = 401!;
      throw error;
    }

    const payload = { email: user.email, role: user.role, id: user._id };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "480m",
    });

    res.cookie("access_token", token, { maxAge: 28800000 }).json(payload);
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  res
    .cookie("access_token", "", { maxAge: 0 })
    .json({ message: "Logout successful!" });
};

export const getProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.user;

    const user = await User.findById(id);

    if (!user) {
      const error: CustomError = new Error("User not found!") as CustomError;
      res.statusCode = 404;
      throw error;
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      const error: CustomError = new Error("User not found!") as CustomError;
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const allUsers = await User.find({});

    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const { email, role } = req.body;
    const updatedFields = {
      email,
      role,
    };

    const user = await User.findByIdAndUpdate(id, updatedFields, { new: true });

    if (!user) {
      const error: CustomError = new Error("User not found!") as CustomError;
      error.statusCode = 404;
      throw error;
    }

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      const error: CustomError = new Error("User not found!") as CustomError;
      error.statusCode = 404;
      throw error;
    }

    res.status(201).json({ message: "Deleted!" });
  } catch (error) {
    next(error);
  }
};
