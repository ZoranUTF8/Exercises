const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const STATUS_CODES = require("http-status-codes");
const User = require("../models/user");
const {
  WrongCredentialsError,
  BadRequestError,
} = require("../utils/customErrors/index");

//? Cookie for the JWT
//! JWT should be stored in a secure only http cookie that We add later
const createUserTokenAndSendResponse = async (res, user) => {
  // const expiryDate = new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN);
  const receivedUser = { ...user._doc };
  //? Remove password from output before we send the user back
  receivedUser.passwordHash = undefined;
  // const cookieOptions = {
  //   expires: expiryDate,
  //   httpOnly: true,
  // };

  // if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  //? If the user has the correct password then return the user data with a new jwt token
  const token = await user.generateToken();
  receivedUser.token = token;
  // res.cookie("JWT_STORAGE", token, cookieOptions);

  
  return res.status(STATUS_CODES.OK).json({
    status: "success",
    data: receivedUser,
  });
};

const login = async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return next(new WrongCredentialsError("Invalid credentials"));
  }

  createUserTokenAndSendResponse(res, user);
};

const register = async (req, res, next) => {
  const { name, username, password } = req.body;

  if (!name || !username || !password) {
    return next(new BadRequestError("Please provide all user values."));
  }

  const newUser = await User.create(req.body);

  createUserTokenAndSendResponse(res, newUser);
};

module.exports = { login, register };
