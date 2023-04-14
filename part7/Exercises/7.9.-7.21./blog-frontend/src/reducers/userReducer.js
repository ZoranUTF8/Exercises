import { createSlice } from "@reduxjs/toolkit";
import LoginService from "../services/LoginService";
import RegisterService from "../services/RegisterService";
import { toast } from "react-toastify";
import * as localStorageOperations from "../utils/localStorageOperations";
//? asynchronous action creators
/*
 first, an asynchronous operation is executed, 
 after which the action changing the state of 
 the store is dispatched.
*/

const initialUserState = { currentUser: null };
const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUser(state, action) {
      localStorageOperations.add_user_to_local_storage(action.payload);
      return action.payload;
    },
  },
});

export const loginUser = (userCredentials) => {
  return async (dispatch) => {
    try {
      const user = await LoginService.loginUser(userCredentials);
      dispatch(setUser(user));
      toast.success(`Welcome back ${user.name}.`);
    } catch (err) {
      return toast.error(err.response.data.msg);
    }
  };
};

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
