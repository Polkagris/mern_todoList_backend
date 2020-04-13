const router = require("express").Router();
let User = require("../models/user.model");
let Todo = require("../models/todo.model");
const jwt = require("jsonwebtoken");
const verify = require("../verifyToken.js");

// POST ALL TODOS FOR ONE USER - based on id/token
router.post("/", verify, async (req, res) => {
  try {
    const token = req.headers.authorization;
    const id = await jwt.decode(token).id;
    const user = await User.findById(id).populate("todos");
    console.log("USER--------------------", user.username);
    res.send({ username: user.username, todos: user.todos });
  } catch (error) {
    res.status(400).send("Error:", error);
  }
});

//  DELETE TODO - user spesific
router.delete("/deletetodo", verify, async (req, res) => {
  try {
    const token = req.headers.authorization;
    const id = await jwt.decode(token).id;
    const user = await User.findById(id);

    // ID comes from client side
    const todoForDeletion = req.body.todoId;
    console.log("-------Todo for deletion-------:", todoForDeletion);
    console.log("-------Todos-------:", user.todos);
    console.log("-------Todos-------:", Todo);

    const deletedTodo = await Todo.findByIdAndDelete(
      { _id: req.body.todoId },
      (result, err) => {
        console.log("findandRomve:", result);
      }
    );
    console.log("@@@@@ deletedTodo @@@@@@", deletedTodo);
    console.log("-------Todos AFTER-------:", user.todos);
    return res.status(200).send("User deleted.");
  } catch (error) {
    console.log("ERROR:", error);
    res.status(400).send(error);
  }
});

module.exports = router;
