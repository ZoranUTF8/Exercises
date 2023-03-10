const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
    // required: true,
    unique: true,
  },
  name: {
    type: String,
    minLength: 3,
    required: [true, "Please provide a name."],
  },
  password: {
    type: String,
    minLength: 8,
    validate: {
      validator: function (v) {
        // Only apply required validation if the document is new
        if (this.isNew) {
          return v && v.length > 0; // Check if the password is provided and not empty
        }
        return true; // For existing documents, always return true to skip this validator
      },
      message: "Please provide a password.",
    },
  },

  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

//! Hash user password on register
userSchema.pre("save", async function (next) {
  //* Only run the function when we register a new user
  if (!this.isNew) {
    return next();
  }
  const saltRounds = 10;
  //? hash the password and delete the confirmed password as we dont save it to db
  this.passwordHash = await bcrypt.hash(this.password, saltRounds);
  this.password = undefined;
  return next();
});

//! Generate a JWT for the user
//? Generate a new JWT token when the user registers
userSchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this._id, username: this.username },
    process.env.JWT_KEY,
    {
      expiresIn: process.env.JWT_EXPIRATION,
    }
  );
};

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed so we delete it here
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
