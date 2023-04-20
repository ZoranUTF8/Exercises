const express = require("express");
const router = express.Router();
const authenticateUserRequest = require("../utils/authMiddleware");

const {
  getSingleBlogPost,
  getAllBlogPosts,
  addNewBlogPost,
  deleteSingleBlogPost,
  updateSingleBlogPost,
  addBlogComment,
} = require("../controllers/blogPostsController");

router
  .route("/")
  .get(getAllBlogPosts)
  .post(authenticateUserRequest, addNewBlogPost);
router
  .route("/:id")
  .get(getSingleBlogPost)
  .delete(authenticateUserRequest, deleteSingleBlogPost)
  .put(authenticateUserRequest, updateSingleBlogPost);

router.route("/:id/comments").post(addBlogComment);
module.exports = router;
