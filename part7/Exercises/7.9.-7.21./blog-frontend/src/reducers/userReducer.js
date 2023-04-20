import { createSlice } from "@reduxjs/toolkit";
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
      localStorageOperations.add_user_to_local_storage(action.payload.user);
      localStorageOperations.add_token_to_local_storage(action.payload.token);
      return {
        ...state,
        currentUser: {
          ...action.payload.user,
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
    logoutUser(state, action) {
      state.currentUser = null;
      localStorageOperations.remove_user_from_local_storage();
      localStorageOperations.remove_token_from_local_storage();

      if (action.payload) {
        toast.success(action.payload);
      }
    },
  },
});

export const addBlogToUser = (blog) => {
  return (dispatch) => {
    dispatch(appendUserBlog(blog));
  };
};

export const logoutUserAndRemoveFromLocalStorage = (message) => {
  return (dispatch) => {
    try {
      dispatch(logoutUser(message));
    } catch (error) {
      console.log("error logging out");
    }
  };
};

export const loginUser = (userCredentials, navigate) => {
  return async (dispatch) => {
    try {
      const response = await LoginService.loginUser(userCredentials);

      if (response.status === "success") {
        toast.success(`Welcome back ${response.user.name}.`);
        dispatch(setUser(response));
        setToken(response.token);
        navigate("/app"); // redirect to the home page after login
      }
    } catch (err) {
      console.log(err);
      return toast.error(err.response.data.msg);
    }
  };
};

export const { setUser, appendUserBlog, logoutUser } = userSlice.actions;

export default userSlice.reducer;
