import { Router } from "express";
import {
  changePassword,
  loginUser,
  logoutUser,
  registerUser,
  passwordRequest,
} from "../Controllers/user.controller";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", logoutUser);
userRouter.post("/passwordRequest", passwordRequest);
userRouter.post("/changePassword", changePassword);

export default userRouter;
