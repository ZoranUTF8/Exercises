import "./App.css";
import { useState, useEffect } from "react";
//* App imports
import {
  DisplayBlogs,
  NavbarComponent,
  LoginForm,
  Error,
} from "./components/Index";

import BlogService from "./services/BlogService";
//* Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchBlogData = async () => {
    const blogs = await BlogService.getAll();
    setBlogs(blogs);
  };
  useEffect(() => {
    fetchBlogData();
    console.log("get data");
  }, []);

  return (
    <Container className="p-0" fluid>
      <NavbarComponent user={user} />
      <Row className="p-1 m-0 app-section d-flex justify-content-center align-items-center">
        {user === null && (
          <Col lg={3} md={6} sm={6} xs={12}>
            <LoginForm
              user={user}
              setUser={setUser}
              setErrorMessage={setErrorMessage}
            />
          </Col>
        )}
        {user !== null && (
          <Col className="bg-info">
            <DisplayBlogs blogs={blogs} />
          </Col>
        )}
        <Error errorMessage={errorMessage} />
      </Row>
    </Container>
  );
};

export default App;
