import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import ConnectToDb from "./DB/DataBase.js";
import authRouter from "./routes/authRouter.js";
import todosRouter from "./routes/todosRouter.js";
import smsRouter from "./routes/smsRouter.js";
import User from "./models/authmodel.js";


dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to DB
await ConnectToDb(); // Ensure DB connection completes before continuing

// Routes
app.use("/api", authRouter);
app.use("/api", todosRouter);
app.use("/api", smsRouter);

// Register endpoint
app.post("/api/register", async (req, res) => {
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
});

// Start server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is working on port ${PORT}`);
});
