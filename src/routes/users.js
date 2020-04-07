const router = require("express").Router();
const User = require("../models/user.model");

// GET
router.route("/").get(async (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((error) => res.status(400).json("Error:", error));
});

// POST NEW USER
router.route("/add").post(async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const newUser = new User({
    username: username,
    email: email,
    password: password,
  });

  newUser
    .save()
    .then(() => {
      res.json("User added!");
    })
    .catch((error) => res.status(400).json("Error:", error));

  console.log("New user:", newUser);
  res.send("user added!");
});

module.exports = router;
