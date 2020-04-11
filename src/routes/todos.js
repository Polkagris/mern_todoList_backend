const router = require("express").Router();
let User = require("../models/user.model");
let Todo = require("../models/todo.model");
const jwt = require("jsonwebtoken");
const verify = require("../verifyToken.js");

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

router.delete("/deletetodo", verify, async (req, res) => {
  try {
    const token = req.headers.authorization;
    const id = await jwt.decode(token).id;
    const user = await User.findById(id);

    // Comes from client side
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

// // GET ALL TODOS BASED ON ID
// router.route("/:id").get(async (req, res) => {
//   try {
//     const { id } = req.params;
//     const todos = await User.findById(id);
//     return res.json(todos);
//   } catch (error) {
//     res.json("Error:" + err);
//   }
// });

// // POST NEW TODO TO USER
// router.route("/:id").post(async (req, res) => {
//   try {
//     const { id } = req.params;
//     const title = req.body.title;
//     const description = req.body.description;

//     // Find user
//     const user = await User.findById(id);

//     const newTodo = new Todo({
//       title: title,
//       description: description,
//     });

//     console.log("FOUND USER____", user);
//     console.log("NEW TODO_____", newTodo);

//     user.todos.push(newTodo);
//     await user.save();

//     console.log("USERS TODOS------", user.todos);

//     return res.send({ username: user.username, todos: user.todos });
//   } catch (error) {
//     console.log("Error:", error);
//     res.status(400).json("Error" + error);
//   }
// });

module.exports = router;
