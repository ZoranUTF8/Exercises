const blogPostsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

//* Get all blog post
blogPostsRouter.get("/", async (req, res) => {
  const blogsPosts = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  res.json(blogsPosts);
});

//* Get single blog post
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

//* Add new blog post
blogPostsRouter.post("/", async (req, res) => {

  const userObject = await User.findById(req.body.userId);

  console.log(userObject.id);

  const newBlogPost = await new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
    user: userObject.id,
  });

  const savedBlogPost = await newBlogPost.save();
  //? Add the note id to the users notes array
  userObject.blogs = userObject.blogs.concat(savedBlogPost._id);

  await userObject.save();

  res.status(201).json({
    message: `Blog post added under id ${savedBlogPost.id}`,
    data: savedBlogPost,
  });
});

//* Delete single blog post
blogPostsRouter.delete("/:id", async (req, res) => {
  const deletedBlogPost = await Blog.findByIdAndRemove(req.params.id);

  res
    .status(204)
    .json({ message: `Blog post with id ${deletedBlogPost.id} was removed.` });
});

//* Update blog post
blogPostsRouter.put("/:id", async (req, res) => {
  const { author, likes, title, url } = req.body;

  const newBlogPost = {
    title,
    likes,
    author,
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
