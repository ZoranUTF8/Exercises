import "./App.css";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import AllAuthors from "./components/AllAuthors";
import AllBooks from "./components/AllBooks";
import Landing from "./components/Landing";
import { Container, Button } from "@mui/material";
import AddBook from "./components/AddBook";
import UpdateAuthor from "./components/UpdateAuthor";
import LoginForm from "./components/LoginForm";
import { useApolloClient } from "@apollo/client";

function App() {
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const logoutUser = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  const padding = {
    padding: 5,
  };

  if (!token) {
    return (
      <Container sx={{ py: 5 }}>
        <h2>Login</h2>
        <LoginForm setToken={setToken} />
      </Container>
    );
  }

  return (
    <div>
      <Container className="app" sx={{ py: 5 }}>
        <h1>GraphQl app</h1>
        <Button onClick={logoutUser}>logout</Button>
        <div>
          <Link style={padding} to="/home">
            Home
          </Link>
          <Link style={padding} to="/authors">
            All authors
          </Link>
          <Link style={padding} to="/books">
            All books
          </Link>
          <Link style={padding} to="/add-book">
            Add book
          </Link>
          <Link style={padding} to="/update-author">
            Update author
          </Link>
        </div>

        <Routes>
          <Route path="/authors" element={<AllAuthors />} />
          <Route path="/books" element={<AllBooks />} />
          <Route path="/home" element={<Landing />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/update-author" element={<UpdateAuthor />} />
        </Routes>
      </Container>
      <footer>
        <i>Library app, Department of Computer Science 2023 , Zoran Janjic</i>
      </footer>
    </div>
  );
}

export default App;
