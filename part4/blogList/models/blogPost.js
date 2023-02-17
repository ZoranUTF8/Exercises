const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const MONGO_URL = `mongodb+srv://admin-zoran:${process.env.ATLAS_DB_PASSWORD}@clusterfullstack2023.999pbro.mongodb.net/blogPostsDatabase?retryWrites=true&w=majority`;

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    likes: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// ?   Remove the _id to id from the returned documents
blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

mongoose
  .connect(MONGO_URL)
  .then((result) => {
    console.log("connected to MongoDB blog posts database");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

module.exports = mongoose.model("Blog", blogSchema);
