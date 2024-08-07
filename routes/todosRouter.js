import express from "express";
import {
  createtodo,
  deletetodo,
  getalltodos,
  updateTodoStatus,
  getCompletedTodos,
} from "../controller/todosController.js";

const todosRouter = express.Router();

todosRouter.post("/createtodo", createtodo);
todosRouter.put("/updateTodoStatus/:userId", updateTodoStatus);
todosRouter.get("/getCompletedTodos/:userId", getCompletedTodos);
todosRouter.get("/gettodos/:userId", getalltodos); // Changed to GET method and used userId parameter
todosRouter.post("/deletetodo", deletetodo); // Changed to GET method and used userId parameter

export default todosRouter;
