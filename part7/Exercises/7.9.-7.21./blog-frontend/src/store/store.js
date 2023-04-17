import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "../reducers/blogsReducer";
import userReducer from "../reducers/userReducer";
import usersReducer from "../reducers/usersReducer";

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    user: userReducer,
    allUsers: usersReducer,
  },
});

export default store;
