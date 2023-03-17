import axios from "axios";
const baseUrl = "http://localhost:3001/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
  config.headers.Authorization = token;
};

const config = {
  headers: { Authorization: token },
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const addNewBlog = async (newBlog) => {

  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const updateBlogLikeCount = async (currentBlog) => {

  const response = await axios.put(
    `${baseUrl}/${currentBlog.id}`,
    currentBlog,
    config
  );

  return response.data;
};

const deleteBlogPost = async (blogId) => {
  const response = await axios.delete(`${baseUrl}/${blogId}`, config);
  return response.data;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, addNewBlog, updateBlogLikeCount, deleteBlogPost };
export { setToken };
