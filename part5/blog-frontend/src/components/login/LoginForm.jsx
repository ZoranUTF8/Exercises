import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import LoginServices from "../../services/LoginService";
import "./loginForm.css";

const LoginForm = ({ user, setUser, setErrorMessage }) => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await LoginServices.loginUser(userData);
      setUser(response);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.msg);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
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
      className=" content mx-auto login-form_container text-center"
      onSubmit={handleSubmit}
    >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Username"
          value={userData.username}
          name="username"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={userData.password}
          name="password"
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default LoginForm;
