const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogPost = [
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    user: "63f8391ff6a57f6caf13430a",
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    user: "63f8391ff6a57f6caf13430a",
    __v: 0,
  },
];

const initialUsersInDb = [
  {
    _id: "63f8391ff6a57f6caf13430a",
    name: "Zoran Janjic",
    username: "Zochan",
    passwordHash:
      "$2b$10$75GtTbfpgs2Za94CfkxIse5imfeSxCaC9mbpJ33hn5VjeArMGTaBS",
    __v: 0,
  },
];

const nonExistingId = async () => {
  const blogPost = new Blog({ title: "willremovethissoon" });
  await blogPost.save();
  await blogPost.remove();

  return blogPost._id.toString();
};

const blogPostsInDb = async () => {
  const blogPosts = await Blog.find({});
  return blogPosts.map((blogPost) => blogPost.toJSON());
};

const allRegisteredUsers = async () => {
  const allUsers = await User.find({});
  return allUsers.map((user) => user.toJSON());
};

module.exports = {
  initialBlogPost,
  nonExistingId,
  blogPostsInDb,
  allRegisteredUsers,
  initialUsersInDb,
};
