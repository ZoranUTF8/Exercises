const User = require("../Models/user");
const Note = require("../Models/note");
const TestRoutes = require("express").Router();

TestRoutes.post("/reset", async (req, res) => {
  await Note.deleteMany({});
  await User.deleteMany({});
  console.log("Test database deleted.");
  res.status(204).end();
});

module.exports = TestRoutes;
