import axios from "axios";
const baseUrl = "http://localhost:3001/api/notes";

const getAllNotes = () => {
  const request = axios.get(baseUrl);
  console.log(request);
  return request.then((response) => response.data);
};

const createNote = (newNote) => {
  const request = axios.post(baseUrl, newNote);
  return request.then((response) => response.data);
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
