const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const url = `mongodb+srv://admin-zoran:${process.env.ATLAS_DB_PASSWORD}@clusterfullstack2023.999pbro.mongodb.net/noteApi?retryWrites=true&w=majority`;

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const noteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      minLength: 5,
      required: true,
    },
    important: Boolean,
  },
  { timestamps: true }
);

//? Remove the _id to id from the returned documents
noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Note", noteSchema);
