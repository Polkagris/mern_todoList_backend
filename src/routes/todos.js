const router = require("express").Router();

router.route("/").get((req, res) => {
  res.send("Todos page gotcha!");
});

// POST NEW TODO TO USER
router.route("/add").post((req, res) => {
  //   try {

  //   }catch(error) {

  //   }

  console.log("Added todo:", newTodo);

  res.send("todo added!");
});

module.exports = router;
