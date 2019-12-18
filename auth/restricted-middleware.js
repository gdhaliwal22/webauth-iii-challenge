const jwt = require("jsonwebtoken");

const secrets = require("../config/secrets.js");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Bad token" });
      } else {
        req.user = decodedToken;
        // can also use line 15-18 instead of just line 13
        // req.user = {
        //   username: decodedToken.username,
        //   departments: decodedToken.departments
        // };
        next();
      }
    });
  } else {
    res.status(400).json({ message: "You shall not pass" });
  }
};
