const Blog = require("../models/blog");
const User = require("../models/user");
const Comment = require("../models/comment");
const { CustomAPIError } = require("../utils/customErrors/index");
const { StatusCodes } = require("http-status-codes");

//* Get all blog post

const getAllBlogPosts = async (req, res, next) => {
  const blogsPosts = await Blog.find({})
    .populate("user", {
      username: 1,
      name: 1,
    })
    .populate({
      path: "comments",
      select: "commentText _id createdAt updatedAt",
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
      user: userObject.id,
    });

    const savedBlogPost = await newBlogPost.save();
    //? Add the blog id to the users notes array
    userObject.blogs = userObject.blogs.concat(savedBlogPost.id);
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
  const blogPostToDelete = await Blog.findById(req.params.id);

  if (blogPostToDelete) {
    if (blogPostToDelete.user.toString() === req.user.id) {
      // Delete the blog post from the blogs collection
      const deletedBlogPost = await Blog.findByIdAndDelete(blogPostToDelete.id);

      // Remove the blog post id from the user's blogs array
      const user = await User.findById(req.user.id);
      user.blogs.pull(blogPostToDelete.id);
      await user.save();

      res.status(200).json({
        message: `Blog post deleted under id ${deletedBlogPost.id}`,
        data: deletedBlogPost,
      });
    } else {
      return next(
        new CustomAPIError(
          `You are not allowed to delete a blog post which does not belong to you.`,
          StatusCodes.UNAUTHORIZED
        )
      );
    }
  } else {
    return next(
      new CustomAPIError(
        `No blog post found with ${req.params.id}`,
        StatusCodes.NOT_FOUND
      )
    );
  }
};

//* Update blog post
//? Add the user id who liked the post.

const updateSingleBlogPost = async (req, res, next) => {
  const { author, likes, title, url, comments } = req.body;

  const newBlogPost = {
    title,
    likes,
    author,
    url,
    comments,
  };

  const updatedBlogPost = await Blog.findByIdAndUpdate(
    req.params.id,
    newBlogPost,
    {
      new: true,
      runValidators: true,
      context: "query",
    }
  ).populate({
    path: "comments",
    select: "commentText _id createdAt updatedAt",
  });

  if (updatedBlogPost) {
    res.status(200).json({ status: "success", data: updatedBlogPost });
  } else {
    return next(
      new CustomAPIError(`No blog post found with ${req.params.id}`, 400)
    );
  }
};

//* Add comment to a blog post
const addBlogComment = async (req, res, next) => {
  //  Find the blog to which the comment is meant for
  const blogPostToAddCommentTo = await Blog.findById(req.params.id);

  // If blog exists
  if (blogPostToAddCommentTo) {
    // Create a new comment and save
    const newComment = await new Comment({ commentText: req.body.commentText });
    const savedComment = await newComment.save();
    // add the comment id to the blog comments array
    const updatedBlogPost = await Blog.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: savedComment._id } },
      {
        new: true,
        runValidators: true,
        context: "query",
      }
    ).populate({
      path: "comments",
      select: "commentText _id createdAt updatedAt",
    });

    res.status(StatusCodes.OK).json({
      message: `Comment added successfully.`,
      blogPost: updatedBlogPost,
    });
  } else {
    return next(
      new CustomAPIError(
        `No such blog post with id ${req.params.id}`,
        StatusCodes.NOT_FOUND
      )
    );
  }
};

//* Delete comment from a blog post

module.exports = {
  deleteSingleBlogPost,
  getSingleBlogPost,
  getAllBlogPosts,
  addNewBlogPost,
  updateSingleBlogPost,
  addBlogComment,
};
