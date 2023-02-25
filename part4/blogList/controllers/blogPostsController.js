const Blog = require("../models/blog");
const User = require("../models/user");
const CustomAPIError = require("../utils/customErrors/CustomApiError");

//* Get all blog post

const getAllBlogPosts = async (req, res, next) => {
  const blogsPosts = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  res.json(blogsPosts);
};

//* Get single blog post

const getSingleBlogPost = async (req, res) => {
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
};

//* Add new blog post
const addNewBlogPost = async (req, res, next) => {
  const userObject = await User.findById(req.user.id);

  if (userObject) {
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
  } else {
    return next(new CustomAPIError("No user found with the provided id.", 400));
  }
};

// //* Delete single blog post
const deleteSingleBlogPost = async (req, res, next) => {
  const deletedBlogPost = await Blog.findByIdAndRemove(req.params.id);

  if (deletedBlogPost) {
    res.status(200).json({
      message: `Blog post deleted under id ${deletedBlogPost.id}`,
      data: deletedBlogPost,
    });
  } else {
    return next(
      new CustomAPIError(`No blog post found with ${req.params.id}`, 400)
    );
  }
};

// //* Update blog post
const updateSingleBlogPost = async (req, res, next) => {
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
  if (updatedBlogPost) {
    res.status(200).json({ status: "success", data: updatedBlogPost });
  } else {
    return next(
      new CustomAPIError(`No blog post found with ${req.params.id}`, 400)
    );
  }
};

module.exports = {
  deleteSingleBlogPost,
  getSingleBlogPost,
  getAllBlogPosts,
  addNewBlogPost,
  updateSingleBlogPost,
};
