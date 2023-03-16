/*Because of the library, we do not
need the next(exception) call anymore.
The library handles everything under the hood.
If an exception occurs in an async route, the 
execution is automatically passed to the error\
 handling middleware.*/
require("express-async-errors");

const express = require("express");

const cors = require("cors");

const app = express();

const config = require("./utils/config");

const logger = require("./utils/logger");

const blogRouter = require("./routers/blog");

const usersRouter = require("./routers/users");

const authRouter = require("./routers/auth");

const middleware = require("./utils/middleware");

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then((result) => {
    console.log(`Connected to ${process.env.TEST_MONGODB_URI}`);
    logger.info("connected to MongoDB blog posts database");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());

// ! If needed later
//! app.use(express.static("build"));
app.use("/api/blogs", blogRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

//! Testing routes
if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./routers/testingRouter");
  app.use("/api/testing", testingRouter);
}
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandlerMiddleware);

module.exports = app;
