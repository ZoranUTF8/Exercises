import { createSlice } from "@reduxjs/toolkit";
import BlogService from "../services/BlogService";
import { toast } from "react-toastify";
import { addBlogToUser } from "./userReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlogs(state, action) {
      return [...state, action.payload];
    },
    setBlogs(state, action) {
      return action.payload;
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload;
      return state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      );
    },
  },
});

//? asynchronous action creators
/*
 first, an asynchronous operation is executed, 
 after which the action changing the state of 
 the store is dispatched.
*/
export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await BlogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await BlogService.addNewBlog(blog);
    dispatch(appendBlogs(newBlog.data));
    dispatch(addBlogToUser(newBlog.data));
  };
};

export const updateBlogLike = (currentBlog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await BlogService.updateBlogLikeCount(currentBlog);
      console.log("updatedBlog", updatedBlog);
      dispatch(updateBlog(updatedBlog));
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };
};

export const addBlogComment = (blogId, commentText) => {
  return async (dispatch) => {
    try {
      const updatedBlogPost = await BlogService.addCommentToBlog(
        blogId,
        commentText
      );
      dispatch(updateBlog(updatedBlogPost.blogPost));
    } catch (error) {
      console.log("error in front: ", error);
      toast.error(error.response.data.msg);
    }
  };
};

export const deleteBlogPost = (blogId) => {
  return async (dispatch) => {
    try {
      const deletedBlogResponse = await BlogService.deleteBlogPost(blogId);
      dispatch(initializeBlogs());
      toast.success(deletedBlogResponse.message);
    } catch (err) {
      toast.error(`Error deleting blog post.`);
    }
  };
};

export const { appendBlogs, setBlogs, updateBlog } = blogSlice.actions;

export default blogSlice.reducer;
