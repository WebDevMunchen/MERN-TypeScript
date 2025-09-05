import User from "../models/user-model";
import type { Request, Response, NextFunction, request } from "express";

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
      return;
    }

    const user = await User.create({
      email,
      password,
    });

    res.status(201).json(user);
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
