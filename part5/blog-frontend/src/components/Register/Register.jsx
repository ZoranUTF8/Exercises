import { useState } from "react";
import "../login/loginForm.css";
import * as localStorageOperations from "../../utils/localStorageOperations";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import RegisterService from "../../services/RegisterService";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const initialState = { username: "", name: "", password: "" };
const Register = ({ setUser, setRegistered }) => {
  const [newUser, setNewUser] = useState(initialState);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleChange = (e) => {
    setNewUser((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (termsAccepted === false) {
      return toast.error("You must accept the terms.");
    }
    try {
      const response = await RegisterService.registerUser(newUser);

      setUser(response.data);
      localStorageOperations.add_user_to_local_storage(response.data);
      toast.success("You successfully registered.");
      setNewUser(initialState);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  const handleTerms = (e) => {
    setTermsAccepted((prevValues) => !prevValues);
    console.log("TERMS CHANGED ", termsAccepted);
  };
  return (
    <Form
      className="mx-auto text-center login-form_container"
      onSubmit={handleSubmit}
    >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Username"
          onChange={handleChange}
          value={newUser.username}
          name="username"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Name"
          onChange={handleChange}
          value={newUser.name}
          name="name"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={newUser.password}
          name="password"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          label="Accept terms."
          onChange={handleTerms}
        />
      </Form.Group>
      <p
        className="toggleLoginOption"
        onClick={() => setRegistered((prevValue) => !prevValue)}
      >
        Have an account?
      </p>
      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form>
  );
};
Register.propTypes = {
  setUser: PropTypes.func.isRequired,
  setRegistered: PropTypes.func.isRequired,
};

export default Register;
