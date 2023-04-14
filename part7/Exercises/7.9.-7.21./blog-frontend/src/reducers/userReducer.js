import { createSlice, current } from "@reduxjs/toolkit";
import LoginService from "../services/LoginService";
import RegisterService from "../services/RegisterService";
import { setToken } from "../services/BlogService";
import { toast } from "react-toastify";
import * as localStorageOperations from "../utils/localStorageOperations";
//? asynchronous action creators
/*
 first, an asynchronous operation is executed, 
 after which the action changing the state of 
 the store is dispatched.
*/

const initialUserState = {
  currentUser: localStorageOperations.get_user_from_local_storage(),
};
const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUser(state, action) {
      localStorageOperations.add_user_to_local_storage(action.payload);

      return {
        ...state,
        currentUser: {
          ...action.payload,
        },
      };
    },
    appendUserBlog(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          blogs: [...state.currentUser.blogs, action.payload],
        },
      };
    },
  },
});

export const addBlogToUser = (blog) => {
  return (dispatch) => {
    dispatch(appendUserBlog(blog));
  };
};

export const loginUser = (userCredentials) => {
  return async (dispatch) => {
    try {
      const response = await LoginService.loginUser(userCredentials);

      if (response.status === "success") {
        console.log(response.user.name);
        toast.success(`Welcome back ${response.user.name}.`);
        dispatch(setUser(response.user));
        setToken(response.token);
      }
    } catch (err) {
      console.log(err);
      return toast.error(err.response.data.msg);
    }
  };
};

export const { setUser, appendUserBlog } = userSlice.actions;

export default userSlice.reducer;
