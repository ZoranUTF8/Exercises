const blogPostsRouter = require("express").Router();
const Blog = require("../models/blogPost");

//* Get  single blog post
blogPostsRouter.get("/", (request, response) => {
  Blog.find({}).then((blogsPosts) => {
    response.json(blogsPosts);
  });
});

//* Get single note
blogPostsRouter.get("/:id", (req, res) => {
  Blog.findById(req.params.id)
    .then((blogPost) => {
      res.status(200);
      res.json({
        status: "success",
        message: `blogPost with ${req.params.id} found`,
        data: blogPost,
      });
    })
    .catch((error) => {
      res.status(204);
      res.json({
        status: "fail",
        message: `No blogPost with ${req.params.id}`,
        error: error.message,
      });
    });
});

//* Add new note
blogPostsRouter.post("/", (req, res, next) => {
  const newBlogPost = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
  });

  newBlogPost
    .save()
    .then((blogPost) => {
      res.status(200).json({
        message: `Note added under id ${blogPost.id}`,
        data: blogPost,
      });
    })
    .catch((err) => {
      next(err);
    });
});

//* Delete single note
blogPostsRouter.delete("/:id", (req, res, next) => {
  Blog.findByIdAndRemove(req.params.id)
    .then((blogPost) => {
      res
        .status(200)
        .json({ message: `Note with id ${blogPost.id} was removed.` });
    })
    .catch((error) => next(error));
});

//* Update note importance
blogPostsRouter.put("/:id", (request, response, next) => {
  const { content, important, title, url } = request.body;

  const newNote = {
    content,
    important,
    title,
    url,
  };

  Blog.findByIdAndUpdate(request.params.id, newNote, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

module.exports = blogPostsRouter;
