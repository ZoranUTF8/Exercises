import "./App.css";
import { useState, useEffect } from "react";
import localStorageOperations from "./utils/localStorageOperations";
//* App imports
import {
  DisplayBlogs,
  NavbarComponent,
  LoginForm,
  AddBlog,
} from "./components/Index";
import { setToken } from "./services/BlogService";

import BlogService from "./services/BlogService";
//* Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  //* Check if user logged in
  useEffect(() => {
    const loggedInUserJSON =
      localStorageOperations.get_user_from_local_storage();

    if (loggedInUserJSON) {
      setUser(loggedInUserJSON);
      setToken(loggedInUserJSON.token);
    } else {
      console.log("No logged in user");
    }
  }, []);

  useEffect(() => {
    fetchBlogData();
  }, [blogs]);

  const fetchBlogData = async () => {
    const blogs = await BlogService.getAll();
    setBlogs(blogs);
  };

  return (
    <Container className="p-0" fluid>
      <NavbarComponent user={user} setUser={setUser} />
      <Row className="p-1 m-0 app-section">
        {user === null && (
          <Col
            lg={3}
            md={6}
            sm={6}
            xs={12}
            className="d-flex flex-column justify-content-center w-100"
          >
            <LoginForm user={user} setUser={setUser} />
          </Col>
        )}
        {user !== null && (
          <Col className="mt-5 justify-content-center">
            <AddBlog setBlogs={setBlogs} blogs={blogs} />
            <DisplayBlogs blogs={blogs} />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default App;
