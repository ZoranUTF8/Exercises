const User = require("../models/user");
const bcrypt = require("bcrypt");
const { BadRequestError } = require("../utils/customErrors/index");
const logger = require("../utils/logger");

const createPasswordHash = async (passwordIn) => {
  return await bcrypt.hash(passwordIn, 10);
};

// * Create new user
const addNewUser = async (req, res, next) => {
  const { username, name, password } = req.body;
  if (
    !name ||
    !username ||
    !password ||
    username.length < 4 ||
    password.length < 4
  ) {
    return next(new BadRequestError("Check your username and password input."));
  } else {
    const passwordHash = await createPasswordHash(password);

    const newUser = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      message: `User added under id ${savedUser.id}`,
      data: savedUser,
    });
  }
};

// * Get all users
const getAllUsers = async (req, res) => {
  const allUsers = await User.find({}).populate("blogs", {
    title: 1,
    likes: 1,
    id: 1,
    url: 1,
  });

  res.status(200).json({ message: "Success", allUsers });
};

module.exports = { addNewUser, getAllUsers };
