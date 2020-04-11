// const router = require("express").Router();
// const jwt = require("jsonwebtoken");
// let User = require("../models/user.model");

// // POST NEW TODO AS LOGGED IN USER
// router.post("/add", async (req, res) => {
//   // find user by checking id from token
//   const token = req.headers.authorization;
//   const id = await jwt.decode(token).id;
//   const user = (await User.findById(id)).populate("todos");
//   console.log("TOKEN:-------", token);
//   console.log("USER:-------", user);
//   res.send({ username: user.username, todos: user.todos });
// });

// module.exports = router;
