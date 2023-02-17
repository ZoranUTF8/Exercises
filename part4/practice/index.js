const express = require("express");

const cors = require("cors");

const app = express(); 

const config = require("./utils/config");

const logger = require("./utils/logger");

const notesRouter = require("./controllers/notes");

const middleware = require("./utils/middleware");

/*
The json-parser functions so that it takes the JSON data of a request,
transforms it into a JavaScript object and then attaches it to the body
 property of the request object before the route handler is called. */
app.use(cors());
app.use(express.json());
// ! If needed later
//! app.use(express.static("build"));
app.use("/api/notes", notesRouter);

app.listen(config.PORT, () => {
  logger.info(`listening on port ${config.PORT}`);
});

//! handler of requests with unknown endpoint
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
