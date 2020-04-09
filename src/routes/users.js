const router = require("express").Router();
let User = require("../models/user.model");

// GET
router.route("/").get(async (req, res) => {
  try {
    const users = await User.find();
    console.log("users:", users);
    return res.json(users);
  } catch (err) {
    res.json("Error:" + err);
  }
});

// POST NEW USER
router.route("/add").post(async (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const newUser = new User({
      username: username,
      email: email,
      password: password,
    });
    await newUser.save();
    res.json("User added!");
  } catch (error) {
    res.status(400).json("error:" + error);
  }
});

module.exports = router;
