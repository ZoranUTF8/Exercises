const logger = require("./logger");

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    response.status(400).json({ error: "Unknown id format" });
  } else if (error.name === "ValidationError") {
    response.status(400).json({ error: error.message });
  }
  next(error);
};

//! Unknown endpoint
const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: "Unknown endpoint" });
};

module.exports = { errorHandler, unknownEndpoint };
