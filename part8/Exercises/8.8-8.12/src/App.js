import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import AllAuthors from "./components/AllAuthors";
import AllBooks from "./components/AllBooks";
import Landing from "./components/Landing";
import { Container } from "@mui/material";
import AddBook from "./components/AddBook";

function App() {
  const padding = {
    padding: 5,
  };

  return (
    <div>
      <Container className="app" sx={{ py: 5 }}>
        <h1>GraphQl app</h1>
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
        </div>

        <Routes>
          <Route path="/authors" element={<AllAuthors />} />
          <Route path="/books" element={<AllBooks />} />
          <Route path="/home" element={<Landing />} />
          <Route path="/add-book" element={<AddBook />} />
        </Routes>
      </Container>
      <footer>
        <i>Library app, Department of Computer Science 2023 , Zoran Janjic</i>
      </footer>
    </div>
  );
}

export default App;
