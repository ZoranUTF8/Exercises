const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { WrongCredentialsError } = require("../utils/customErrors/index");

const login = async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return next(new WrongCredentialsError("Invalid credentials"));
  }

  const tokenForUser = { username: user.username, id: user.id };

  const token = jwt.sign(tokenForUser, process.env.JWT_SECRET);

  res.status(200).json({ token, username: user.username, name: user.name });
};

const register = (req, res) => {
  console.log("register");
  res.send("ola");
};

module.exports = { login, register };
