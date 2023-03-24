import axios from "axios";

const baseUrl = "http://localhost:3001/notes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNote = async (content) => {
  const note = { content, important: false };
  const response = await axios.post(baseUrl, note);
  return response.data;
};

export default { getAll, createNote };
