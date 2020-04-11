const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation");

// REGISTER ------------------------------------
router.route("/register").post(async (req, res) => {
  // Validate data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if email exists
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.send("Email already exists");

  // check if username exists
  const usernameExists = await User.findOne({ username: req.body.username });
  if (usernameExists) return res.send("Username already exists");

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    await user.save();
    res.status(200).send({ user: user._id, username: user.username });
  } catch (error) {
    res.status(400).send("Error:", error);
  }
});
// LOGIN ------------------------------------
router.route("/login").post(async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error)
    return res
      .status(400)
      .send({ message: error.details[0].message, success: false });
  // check if email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.send({ message: "User does not exist.", success: false });

  //check if password match
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res
      .status(400)
      .send({ message: "Password is not correct", success: false });

  // User is authenticated -> generate JWT token
  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
  res.send({ token: token, success: true });
});

module.exports = router;
