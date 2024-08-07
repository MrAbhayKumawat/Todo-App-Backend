import User from "../models/authmodel.js";
import hashPassword from "../utils/hashPassword.js";
import bcrypt from "bcrypt";
import { generateJwtToken } from "../utils/generateJwtToken.js";
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const tokenpayload = {
      userId: user.id,
      name: user.name,
      email: user.email,
    };
    const token = await generateJwtToken(tokenpayload);
    res.status(200).json({
      message: "Login Successful",
      userdata: {
        name: user.name,
        id: user.id,
        email: user.email,
        userlogin: true,
      },
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res
        .status(409)
        .json({ message: "User Already Exists", data: userExist });
    }

    const hashedPassword = await hashPassword(password);
    const userdata = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Registration Successful",
      data: userdata,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};
