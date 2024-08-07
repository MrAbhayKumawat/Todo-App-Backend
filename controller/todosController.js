import Todo from "../models/todosmodel.js";

export const createtodo = async (req, res) => {
  try {
    const { title, completed } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const userId = req.user.userId;
    const name = req.user.name;
    const email = req.user.email;

    const userTodos = await Todo.findOne({ userId });

    const newTodo = {
      title,
      completed: completed,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (userTodos) {
      userTodos.usertodos.push(newTodo);
      await userTodos.save();
    } else {
      await Todo.create({
        userId,
        name,
        email,
        usertodos: [newTodo],
      });
    }

    res.status(201).json(newTodo);
  } catch (error) {
    console.error("Error creating new todo:", error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the todo" });
  }
};
export const updateTodoStatus = async (req, res) => {
  const { userId } = req.params;
  const { completed, todoId } = req.body;

  try {
    const user = await Todo.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const todo = user.usertodos.find((todo) => todo._id.toString() === todoId);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todo.completed = completed;
    todo.updatedAt = new Date();

    user.markModified("usertodos");

    await user.save();

    res.status(200).json({ message: "Todo status updated successfully", todo });
  } catch (error) {
    console.error("Error updating todo:", error);

    res.status(500).json({
      message: "An error occurred while updating the todo",
      error: error.message,
    });
  }
};

export const getalltodos = async (req, res) => {
  const { userId } = req.params;

  try {
    if (!userId) {
      return res.status(401).json({ message: "User ID is required" });
    }

    const user = await Todo.findOne({ userId: userId }).populate("usertodos");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Todos retrieved successfully", todos: user });
  } catch (error) {
    console.error("Error retrieving todos:", error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving the todos" });
  }
};
export const getCompletedTodos = async (req, res) => {
  const { userId } = req.params;

  try {
    if (!userId) {
      return res.status(401).json({ message: "User ID is required" });
    }

    const user = await Todo.findOne({ userId }).populate("usertodos");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const completedTodos = user.usertodos.filter((todo) => todo.completed);

    res
      .status(200)
      .json({
        message: "Completed todos retrieved successfully",
        todos: completedTodos,
      });
  } catch (error) {
    console.error("Error retrieving todos:", error);
    res
      .status(500)
      .json({
        message: "An error occurred while retrieving the todos",
        error: error.message,
      });
  }
};

export const deletetodo = async (req, res) => {
  try {
    const { userId, todoId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "Todo userId is required" });
    }

    const userTodos = await Todo.findOne({ userId });

    if (!userTodos) {
      return res
        .status(404)
        .json({ message: "User not found or no todos exist" });
    }

    const todoIndex = userTodos.usertodos.findIndex(
      (todo) => todo._id.toString() === todoId
    );

    if (todoIndex === -1) {
      return res.status(404).json({ message: "Todo not found" });
    }

    userTodos.usertodos.splice(todoIndex, 1);
    await userTodos.save();

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the todo" });
  }
};
