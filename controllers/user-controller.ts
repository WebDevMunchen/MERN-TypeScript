import User from "../models/user-model";
import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/user";

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
      res.status(400).json({ message: "User already exists!" });
      return;
    }

    const user = await User.create({
      email,
      password: hash,
    });

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error!" });
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
      res.status(404).json({ message: "User not found!" });
      return;
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      res.status(409).json({ message: "Incorrect password!" });
      return;
    }

    const payload = { email: user.email, role: user.role, id: user._id };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "480m",
    });

    res.cookie("access_token", token, { maxAge: 28800000 }).json(payload);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error!" });
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
      res.status(404).json({ message: "User not found!" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error!" });
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
      res.status(404).json({ message: "User not found!" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error!" });
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
    console.log(error);
    res.status(500).json({ message: "Server error!" });
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
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error!" });
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
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(201).json({ message: "Deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error!" });
  }
};
