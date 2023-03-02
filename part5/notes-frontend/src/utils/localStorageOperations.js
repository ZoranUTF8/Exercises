const add_user_to_local_storage = (user, token) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const remove_user_from_local_storage = () => {
  localStorage.removeItem("user");
};

const get_user_from_local_storage = () => {
  const result = localStorage.getItem("user");
  const user = result ? JSON.parse(result) : null;
  return user;
};

const get_token_from_local_storage = () => {
  const result = localStorage.getItem("token");
  const token = result ? JSON.parse(result) : null;
  return token;
};

export default {
  add_user_to_local_storage,
  remove_user_from_local_storage,
  get_user_from_local_storage,
  get_token_from_local_storage,
};
