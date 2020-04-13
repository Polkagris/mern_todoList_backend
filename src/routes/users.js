const router = require("express").Router();
let User = require("../models/user.model");
let Todo = require("../models/todo.model");
const jwt = require("jsonwebtoken");
const verify = require("../verifyToken.js");

// GET ALL USERS
router.route("/").get(async (req, res) => {
  try {
    const users = await User.find();
    console.log("users:", users);
    return res.json(users);
  } catch (err) {
    res.json("Error:" + err);
  }
});

// // POST NEW USER - NOT IN USE BECAUSE OF REGISTER ROUTE
// router.post("/add", verify, async (req, res) => {
//   try {
//     const username = req.body.username;
//     const email = req.body.email;
//     const password = req.body.password;

//     const newUser = new User({
//       username: username,
//       email: email,
//       password: password,
//     });
//     await newUser.save();
//     res.json("User added!");
//   } catch (error) {
//     res.status(400).json("error:" + error);
//   }
// });

// CREATE NEW TODO BASED ON USER ID
router.post("/todo", verify, async (req, res) => {
  try {
    const token = req.headers.authorization;
    const id = await jwt.decode(token).id;
    const user = await User.findById(id);
    const newTodo = await Todo.create(req.body);
    user.todos.push(newTodo);
    user.save();
    console.log("Todo added to user: ", newTodo);
    console.log("user------------------: ", user);
    res.send("todo added");
  } catch (error) {
    res.status(400).send("Error:", error);
  }
});

module.exports = router;
