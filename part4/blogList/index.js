const express = require("express");

const app = express();

const cors = require("cors");

const config = require("./utils/config");

const middleware = require("./utils/middleware");

const blogRouter = require("./controllers/blogPostsController");

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRouter);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
