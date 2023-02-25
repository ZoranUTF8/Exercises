const express = require("express");
const router = express.Router();
const authenticateUserRequest = require("../utils/authMiddleware");

const {
  getSingleBlogPost,
  getAllBlogPosts,
  addNewBlogPost,
  deleteSingleBlogPost,
  updateSingleBlogPost,
} = require("../controllers/blogPostsController");

router
  .route("/")
  .get(getAllBlogPosts)
  .post(authenticateUserRequest, addNewBlogPost);
router
  .route("/:id")
  .get(getSingleBlogPost)
  .delete(deleteSingleBlogPost)
  .put(updateSingleBlogPost);
module.exports = router;
