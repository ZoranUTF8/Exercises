const express = require("express");

const cors = require("cors");

const app = express();

const config = require("./utils/config");

const logger = require("./utils/logger");

const notesRouter = require("./controllers/notes");

const middleware = require("./utils/middleware");

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
logger.info("connecting to", config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI)
  .then((result) => {
    logger.info("connected to", config.MONGODB_URI);
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });
/*
The json-parser functions so that it takes the JSON data of a request,
transforms it into a JavaScript object and then attaches it to the body
 property of the request object before the route handler is called. */
app.use(cors());
app.use(express.json());
// ! If needed later
//! app.use(express.static("build"));
app.use("/api/notes", notesRouter);

//! handler of requests with unknown endpoint
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
