const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const logger = require("./middleware/logger.js");

const authRouter = require("./auth/auth-router.js");
const userRouter = require("./users/user-router");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(logger);

server.use("/api", authRouter);
server.use("/api/users", userRouter);

server.get("/", (req, res) => {
  res.send("Server is working");
});

module.exports = server;
