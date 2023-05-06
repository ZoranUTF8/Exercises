const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const MONGODB_URI = process.env.TEST_MONGODB_URI_GRAPHQL;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("connected to MongoDB on the uri: " + MONGODB_URI);
    return mongoose.connection;
  } catch (error) {
    console.log("error connection to MongoDB:", error.message);
    throw error;
  }
};

module.exports = {
  connectDB,
};
