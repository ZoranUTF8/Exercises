import "./App.css";
import { useState, useEffect, useRef } from "react";
import * as localStorageOperations from "./utils/localStorageOperations";

import { Routes, Route } from "react-router-dom";
//* App imports
import {
  DisplayBlogs,
  NavbarComponent,
  LoginForm,
  AddBlog,
  Togglable,
  Register,
  SingleUser,
  AllUsers,
  ProtectedRoute,
  SingleBlogView,
} from "./components/Index";
import { setToken } from "./services/BlogService";
//* Reducer
import { initializeBlogs } from "./reducers/blogsReducer";
import { useDispatch } from "react-redux";

//* Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const App = () => {
  const toggleAddNoteref = useRef();
  const dispatch = useDispatch();

  //* Check if user logged in
  useEffect(() => {
    const loggedInUserJSONToken =
      localStorageOperations.get_token_from_local_storage();
    if (loggedInUserJSONToken) setToken(loggedInUserJSONToken);
  }, []);

  //* Get all blogs on first render
  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  return (
    <Container className="p-0" fluid>
      <Row>
        <Col>
          <NavbarComponent />

          <Routes>
            <Route path="app" element={<ProtectedRoute />}>
              <Route
                index
                element={
                  <>
                    <Togglable buttonLabel="Add note" ref={toggleAddNoteref}>
                      <AddBlog toggleAddNoteref={toggleAddNoteref} />
                    </Togglable>
                    <DisplayBlogs />
                  </>
                }
              />

              <Route path="allusers" element={<AllUsers />} />
              <Route path="users/:id" element={<SingleUser />} />
              <Route path="blog/:id" element={<SingleBlogView />} />
            </Route>

            <Route path="login" element={<LoginForm />} />

            <Route
              path="*"
              element={<h1 className="text-primary">No such page</h1>}
            />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
