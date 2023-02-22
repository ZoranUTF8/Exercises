const usersRouter = require("express").Router();
const User = require("../Models/user");
const bcrypt = require("bcrypt");

//* Add new user
usersRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

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
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({});
  response.json(users);
});
module.exports = usersRouter;
