import "./login.css";
import { useState } from "react";
import LoginServices from "../../Services/LoginServices";

const Login = ({ setUser, setErrorMessage }) => {
  const [userLoginData, setUserLoginData] = useState({
    username: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await LoginServices.loginUser(userLoginData);
      setUser(response.data);

      setUserLoginData((prevValues) => ({
        ...prevValues,
        username: "",
        password: "",
      }));
    } catch (err) {
      setErrorMessage(err.response.data.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleChange = (e) => {
    setUserLoginData((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div>
      <h1>Login</h1>
      <form className="login_form" onSubmit={handleSubmit}>
        <label htmlFor="email">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={userLoginData.username}
          placeholder="Enter your email"
          required
          className="input_field"
          onChange={handleChange}
        />
        <label htmlFor="email">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={userLoginData.password}
          placeholder="Enter your password"
          required
          className="input_field"
          onChange={handleChange}
        />

        <button id="login-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
