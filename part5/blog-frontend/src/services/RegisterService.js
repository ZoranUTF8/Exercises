import axios from "axios";

const baseUrl = "http://localhost:3001/api/auth/register";

const registerUser = async (userCredentials) => {
  const response = await axios.post(baseUrl, userCredentials);
  return response.data;
};

export default registerUser;
