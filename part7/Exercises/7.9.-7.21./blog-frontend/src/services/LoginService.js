import axios from "axios";

const baseUrl = "http://localhost:3001/api/auth/login";

const loginUser = async (userCredentials) => {
  const response = await axios.post(baseUrl, userCredentials);

  return response.data.data;
};

export default { loginUser };
