const blogPostsRouter = require("express").Router();
const Blog = require("../models/blogPost");

//* Get  single blog post
blogPostsRouter.get("/", async (req, res) => {
  const blogsPosts = await Blog.find({});
  res.json(blogsPosts);
});

//* Get single note
blogPostsRouter.get("/:id", async (req, res) => {
  const foundBlogPost = await Blog.findById(req.params.id);

  if (foundBlogPost) {
    res.status(200);
    res.json({
      status: "success",
      message: `blogPost with ${req.params.id} found`,
      data: foundBlogPost,
    });
  } else {
    res.status(204);
    res.json({
      status: "fail",
      message: `No blogPost with ${req.params.id}`,
    });
  }
});

//* Add new note
blogPostsRouter.post("/", async (req, res) => {
  const newBlogPost = await new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
  });

  const savedBlogPost = await newBlogPost.save();

  res.status(201).json({
    message: `Blog post added under id ${savedBlogPost.id}`,
    data: savedBlogPost,
  });
});

//* Delete single note
blogPostsRouter.delete("/:id", async (req, res) => {
  const deletedBlogPost = await Blog.findByIdAndRemove(req.params.id);

  res
    .status(204)
    .json({ message: `Blog post with id ${deletedBlogPost.id} was removed.` });
});

//* Update note importance
blogPostsRouter.put("/:id", async (req, res) => {
  const { content, important, title, url } = request.body;

  const newBlogPost = {
    content,
    important,
    title,
    url,
  };
  const updatedBlogPost = await Blog.findByIdAndUpdate(
    req.params.id,
    newBlogPost,
    {
      new: true,
      runValidators: true,
      context: "query",
    }
  );

  res.status(200).json(updatedBlogPost);
});

module.exports = blogPostsRouter;
