import axios from "axios";
const baseUrl = "http://localhost:3001/api/notes";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAllNotes = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
  // return request.then((response) => response.data);
};

const createNote = async (newNote) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = await axios.post(baseUrl, newNote, config);

  return request.data;
};

const updateNote = (id, updatedNote) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedNote);
  return request.then((response) => {
    return response.data;
  });
};

const deleteNote = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((res) => {
    return {
      status: res.status,
      message: res.statusText,
    };
  });
};

export default { getAllNotes, createNote, updateNote, deleteNote };
export { setToken };
