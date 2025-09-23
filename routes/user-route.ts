import express from "express";
import {
  deleteUser,
  getAllUsers,
  getProfile,
  getUser,
  login,
  logout,
  register,
  updateUser,
} from "../controllers/user-controller";
import { authenticate, authorize } from "../middlewares/authenticate";

const userRouter = express.Router();

userRouter.route("/register").post(register);
userRouter.route("/login").post(login);
userRouter.route("/logout").post(logout);
userRouter.route("/getAllUsers").get(getAllUsers);
userRouter.route("/getProfile").get(authenticate, authorize("admin"), getProfile);
userRouter.route("/getUser/:id").get(getUser);
userRouter.route("/updateUser/:id").put(updateUser);
userRouter.route("/deleteUser/:id").delete(deleteUser);

export default userRouter;
