import { useState, useEffect } from "react";
import { TextField, Button, Container } from "@mui/material";
import { useMutation } from "@apollo/client";
import queries from "../queries/queries";

const LoginForm = ({ setToken, setErrorMessage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
  };

  const [login, result] = useMutation(queries.LOGIN_USER, {
    onError: (error) => {
      console.log(error);
      setErrorMessage(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("phonenumbers-user-token", token);
    }
  }, [result.data]);

  return (
    <Container>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20%",
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          required
          label="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          style={{ marginBottom: "1rem" }}
        />
        <TextField
          required
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          style={{ marginBottom: "1rem" }}
        />
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
      </form>
    </Container>
  );
};

export default LoginForm;
