import User from "../models/user-model";
import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/user";
import { CustomError } from "../utils/CustomError";
import { asyncWrapper } from "../utils/asyncWrapper";

export const register = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;

    const findUser = await User.findOne({ email });

    if (findUser) {
      throw new CustomError("User already exists!", 409);
    }

    const user = await User.create({
      email,
      password,
    });

    res.status(201).json(user);
  }
);

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new CustomError("User not found!", 404);
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new CustomError("Incorrect password!", 401);
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
      throw new CustomError("User not found!", 404);
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
      throw new CustomError("User not found!", 404);
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
      throw new CustomError("User not found!", 404);
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
      throw new CustomError("User not found!", 404);
    }

    res.status(201).json({ message: "Deleted!" });
  } catch (error) {
    next(error);
  }
};
