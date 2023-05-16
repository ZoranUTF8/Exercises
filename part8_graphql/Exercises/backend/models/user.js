const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
  },

  password: { type: String, required: true, minlength: 8 },
  favoriteGenre: [{ type: String }],
});

module.exports = mongoose.model("User", userSchema);
