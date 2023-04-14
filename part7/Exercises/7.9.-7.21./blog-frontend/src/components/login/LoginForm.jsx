import { useState } from "react";

import "./loginForm.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as localStorageOperations from "../../utils/localStorageOperations";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../reducers/userReducer";
import Loading from "../Loading/Loading";




const LoginForm = ({ setRegistered }) => {
  const dispatch = useDispatch();
  const { currentUser, isLoading } = useSelector((store) => store.user);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(loginUser(userData));
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const handleChange = (e) => {
    setUserData((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Form
      className="content mx-auto login-form_container text-center"
      onSubmit={handleSubmit}
    >
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          id="login-username"
          type="text"
          placeholder="Username"
          value={userData.username}
          name="username"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          id="login-password"
          type="password"
          placeholder="Password"
          value={userData.password}
          name="password"
          onChange={handleChange}
        />
      </Form.Group>
      <p
        className="toggleLoginOption"
        onClick={() => setRegistered((prevValue) => !prevValue)}
      >
        Don't have an account?
      </p>
      <Button id="login-btn" variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
};

LoginForm.propTypes = {
  setRegistered: PropTypes.func.isRequired,
};

export default LoginForm;
