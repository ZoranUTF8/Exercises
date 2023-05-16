const mongoose = require("mongoose");

/* 
mongoose-unique-validator is a plugin for Mongoose (an Object Data Modeling (ODM) library
for MongoDB and Node.js), which adds pre-save validation for unique fields within a Mongoose schema.
This plugin simplifies the validation process for unique fields by providing better error handling
and message reporting.

when a user document is saved to MongoDB, mongoose-unique-validator will automatically check
that the title field is unique. If they are not, the validation will fail
and an error message will be returned.

*/
const uniqueValidator = require("mongoose-unique-validator");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
  },
  published: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
  genres: [{ type: String }],
});

bookSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Book", bookSchema);
