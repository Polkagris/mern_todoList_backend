const router = require("express").Router();
let User = require("../models/user.model");
let Todo = require("../models/todo.model");

// GET ALL TODOS BASED ON ID
router.route("/:id").get(async (req, res) => {
  try {
    const { id } = req.params;
    const todos = await User.findById(id);
    return res.json(todos);
  } catch (error) {
    res.json("Error:" + err);
  }
});

// POST NEW TODO TO USER
router.route("/:id").post(async (req, res) => {
  try {
    const { id } = req.params;
    const title = req.body.title;
    const description = req.body.description;

    // Find user
    const user = await User.findById(id);

    const newTodo = new Todo({
      title: title,
      description: description,
    });

    console.log("FOUND USER____", user);
    console.log("NEW TODO_____", newTodo);

    user.todos.push(newTodo);
    await user.save();

    console.log("USERS TODOS------", user.todos);

    return res.send({ username: user.username, todos: user.todos });
  } catch (error) {
    console.log("Error:", error);
    res.status(400).json("Error" + error);
  }
});

module.exports = router;
