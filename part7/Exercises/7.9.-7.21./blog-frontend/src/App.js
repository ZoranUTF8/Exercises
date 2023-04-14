import "./App.css";
import { useState, useEffect, useRef } from "react";
import * as localStorageOperations from "./utils/localStorageOperations";
//* App imports
import {
  DisplayBlogs,
  NavbarComponent,
  LoginForm,
  AddBlog,
  Togglable,
  Register,
} from "./components/Index";
import { setToken } from "./services/BlogService";
//* Reducer
import { initializeBlogs } from "./reducers/blogsReducer";
import { useSelector, useDispatch } from "react-redux";

import BlogService from "./services/BlogService";
//* Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";

const App = () => {
  const { currentUser, isLoading } = useSelector((store) => store.user);
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [registered, setRegistered] = useState(false);
  const toggleAddNoteref = useRef();
  const dispatch = useDispatch();

  //* Check if user logged in
  useEffect(() => {
    console.log("here");
    const loggedInUserJSON =
      localStorageOperations.get_user_from_local_storage();
    if (loggedInUserJSON) {
      setUser(loggedInUserJSON);
      setToken(loggedInUserJSON.token);
    } else {
      console.log("No logged in user");
    }
  }, []);

  //* Get all blogs on first render
  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  return (
    <Container className="p-0" fluid>
      <NavbarComponent user={user} setUser={setUser} />
      <Row className="p-1 m-0 app-section">
        {currentUser === null && (
          <Col
            lg={3}
            md={6}
            sm={6}
            xs={12}
            className="d-flex flex-column justify-content-center w-100"
          >
            {registered ? (
              <Register setUser={setUser} setRegistered={setRegistered} />
            ) : (
              <LoginForm setUser={setUser} setRegistered={setRegistered} />
            )}
          </Col>
        )}
        {currentUser !== null && (
          <Col lg={12} className="mt-5">
            <Stack gap={3}>
              <Togglable buttonLabel="Add note" ref={toggleAddNoteref}>
                <AddBlog
                  setBlogs={setBlogs}
                  toggleAddNoteref={toggleAddNoteref}
                  setUser={setUser}
                />
              </Togglable>
              <DisplayBlogs setBlogs={setBlogs} user={currentUser} />
            </Stack>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default App;
