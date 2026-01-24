import express from "express";
const userRouter = express.Router();
import {
  registerUser,
  loginUser,
  getProfile,
  logout,
} from "../controllers/userController.js";

userRouter.get("/", (req, res) => res.render("login", { error: null }));
userRouter.get("/register", (req, res) =>
  res.render("register", { error: null })
);

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile",  getProfile);
userRouter.get("/logout", logout);

export default userRouter;
