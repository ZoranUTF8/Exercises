export const add_user_to_local_storage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const remove_user_from_local_storage = () => {
  localStorage.removeItem("user");
};

export const get_user_from_local_storage = () => {
  const result = localStorage.getItem("user");
  const user = result ? JSON.parse(result) : null;
  return user;
};

export const add_token_to_local_storage = (token) => {
  localStorage.setItem("token", JSON.stringify(token));
};

export const remove_token_from_local_storage = (token) => {
  localStorage.removeItem("token", JSON.stringify(token));
};

export const get_token_from_local_storage = () => {
  const result = localStorage.getItem("token");
  const token = result ? JSON.parse(result) : null;
  return token;
};

export default {
  add_user_to_local_storage,
  remove_user_from_local_storage,
  add_token_to_local_storage,
  remove_token_from_local_storage,
};
