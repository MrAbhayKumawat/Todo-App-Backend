import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import ConnectToDb from "./DB/DataBase.js";
import authRouter from "./routes/authRouter.js";
import todosRouter from "./routes/todosRouter.js";
import { UserAuthMiddleware } from "./middleware/UserAuthMiddleware.js";
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 7000;

// DB Connection
ConnectToDb();

// Use Routes

app.use("/api", authRouter);
app.use("/api", UserAuthMiddleware, todosRouter);

// Port listen
app.listen(PORT, () => {
  console.log(`Server is working on port ${PORT}`);
});
