import express from "express";
import { register, login, getusers } from "../controller/authController.js";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.post("/getusers", getusers);

export default authRouter;
