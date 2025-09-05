import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  register,
  updateUser,
} from "../controllers/user-controller";

const userRouter = express.Router();

userRouter.route("/register").post(register);
userRouter.route("/getAllUsers").get(getAllUsers);
userRouter.route("/getUser/:id").get(getUser);
userRouter.route("/updateUser/:id").put(updateUser);
userRouter.route("/deleteUser/:id").delete(deleteUser);

export default userRouter;
