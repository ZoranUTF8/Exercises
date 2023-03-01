import axios from "axios";

const baseAuthUrl = "http://localhost:3001/api/login";

const loginUser = async (userCredentials) => {
  const response = await axios.post(baseAuthUrl, userCredentials);
  return response;
};

export default { loginUser };
