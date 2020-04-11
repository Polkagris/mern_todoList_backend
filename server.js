const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(
  uri,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  (error) => {
    if (error) console.log(`Error: ${error}`);

    console.log("Database connection successful!");
  }
);

const usersRouter = require("./src/routes/users");
const todosRouter = require("./src/routes/todos");
const authRouter = require("./src/routes/auth");
// const newTodoRouter = require("./src/routes/newTodo");

app.use("/users", usersRouter);
app.use("/todos", todosRouter);
app.use("/user", authRouter);
// app.use("/newtodo", newTodoRouter);

app.listen(PORT, () => {
  console.log(`Server running smoothly on port ${PORT}`);
});
