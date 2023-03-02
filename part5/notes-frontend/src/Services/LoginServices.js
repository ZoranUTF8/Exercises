import axios from "axios";
import { setToken } from "./NotesDbServices";
import localStorageOperations from "../utils/localStorageOperations";
const baseAuthUrl = "http://localhost:3001/api/login";

const loginUser = async (userCredentials) => {
  const response = await axios.post(baseAuthUrl, userCredentials);
  setToken(response.data.token);
  localStorageOperations.add_user_to_local_storage(response.data);
  return response;
};

export default { loginUser };
