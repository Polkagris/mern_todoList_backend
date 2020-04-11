const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // check for token in header
  const token = req.headers.authorization;
  if (!token) return res.status(401).send("Access denied.");

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).send("Invalid token.");
  }
};
