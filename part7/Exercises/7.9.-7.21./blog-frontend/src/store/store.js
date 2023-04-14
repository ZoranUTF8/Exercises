import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "../reducers/blogsReducer";
import userReducer from "../reducers/userReducer";

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    user: userReducer,
  },
});

export default store;
