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
  try {
    const { email, username, password } = req.body;

    // Validate input
    if (!password) {
      return res.status(400).json({ message: "Password fields are required" });
    }


    // Hash password

    // Create user
    const user = new User({
      email,
      username,
      password: password,
    });

    await user.save();

    res.status(201).json({
      success:true,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
