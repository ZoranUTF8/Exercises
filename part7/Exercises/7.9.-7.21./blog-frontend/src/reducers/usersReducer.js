import { createSlice } from "@reduxjs/toolkit";
import UsersServices from "../services/UsersServices";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setAllUsers(state, action) {
      return action.payload;
    },
  },
});

//? asynchronous action creators
/*
 first, an asynchronous operation is executed, 
 after which the action changing the state of 
 the store is dispatched.
*/

export const getAllUsersFromDb = () => {
  return async (dispatch) => {
    const allUsersData = await UsersServices.getAllUsers();
    dispatch(setAllUsers(allUsersData.allUsers));
  };
};

export const { setAllUsers } = usersSlice.actions;

export default usersSlice.reducer;
