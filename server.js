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


// Start server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is working on port ${PORT}`);
});
