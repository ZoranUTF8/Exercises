import axios from "axios";
const baseUrl = "http://localhost:3001/api/blogs";

let token = null;

const setToken = (newToken) => {
  console.log("token set", newToken);
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
  console.log("config :", config);

  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const updateBlogLikeCount = async (currentBlog) => {
  // fetch the existing blog object

  const response = await axios.get(`${baseUrl}/${currentBlog.id}`, config);

  const blogToUpdate = response.data.data;

  blogToUpdate.likes = Number(blogToUpdate.likes) + 1;

  const updatedBlogResponse = await axios.put(
    `${baseUrl}/${currentBlog.id}`,
    blogToUpdate,
    config
  );

  return updatedBlogResponse.data.data;
};

const deleteBlogPost = async (blogId) => {
  const response = await axios.delete(`${baseUrl}/${blogId}`, config);
  return response.data;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, addNewBlog, updateBlogLikeCount, deleteBlogPost };
export { setToken };
