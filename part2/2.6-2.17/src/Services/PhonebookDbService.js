import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAllPersons = () => {
  const request = axios.get(baseUrl);
  return request.then((res) => res.data);
};

const addNewPerson = (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  return request.then((res) => res.data);
};

const deleteNewPerson = (personId) => {
  const request = axios.delete(`${baseUrl}/${personId}`);
  return request.then((res) => {
    return { status: res.status, msg: res.statusText };
  });
};

const updatePerson = (personId, newPersonDetails) => {
  const request = axios.put(`${baseUrl}/${personId}`, newPersonDetails);
  return request.then((res) => res.data);
};

export default { getAllPersons, addNewPerson, deleteNewPerson, updatePerson };
