import { useState } from "react";
import DisplayPersons from "./components/DisplayPersons";
import { Container, Button } from "@mui/material";
import LoginForm from "./components/Login";
import Notification from "./components/Notification";
import "./App.css";
import { useApolloClient } from "@apollo/client";

function App() {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const client = useApolloClient();

  const logoutUser = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  

  if (!token) {
    return (
      <Container sx={{ py: 5 }}>
        <Notification
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
        <LoginForm setErrorMessage={setErrorMessage} setToken={setToken} />;
      </Container>
    );
  }
  return (
    <div className="app">
      <Container sx={{ py: 5 }}>
        <Button onClick={logoutUser}>logout</Button>
        <DisplayPersons />
      </Container>
    </div>
  );
}

export default App;
