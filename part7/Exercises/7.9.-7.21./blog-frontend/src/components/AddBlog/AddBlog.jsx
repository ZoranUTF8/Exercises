import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { createBlog } from "../../reducers/blogsReducer";

const AddBlog = ({ toggleAddNoteref }) => {
  
  const dispatch = useDispatch();
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

  const handleChange = (e) => {
    setNewBlog((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(createBlog(newBlog));
    // ! ADD blog to user database array
    // setUser((prevUser) => ({
    //   ...prevUser,
    //   blogs: [...prevUser.blogs, response.data.id],
    // }));

    setNewBlog({ title: "", author: "", url: "" });
    // toast.success(
    //   `A new blog ${response.data.title} ! By ${response.data.author} added.`
    // );
    toggleAddNoteref.current.toggleVisibility();
  };

  return (
    <div className="text-center">
      <h2>AddBlog</h2>
      <Container>
        <Row className="justify-content-center mb-3">
          <Col sm={12} md={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <FormControl
                  type="text"
                  placeholder="Enter title"
                  value={newBlog.title}
                  onChange={handleChange}
                  required
                  minLength={5}
                  name="title"
                />
              </Form.Group>

              <Form.Group controlId="author">
                <Form.Label>Author</Form.Label>
                <FormControl
                  type="text"
                  placeholder="Enter author"
                  value={newBlog.author}
                  onChange={handleChange}
                  required
                  minLength={5}
                  name="author"
                />
              </Form.Group>

              <Form.Group controlId="url">
                <Form.Label>URL</Form.Label>
                <FormControl
                  type="text"
                  placeholder="Enter URL"
                  value={newBlog.url}
                  onChange={handleChange}
                  required
                  minLength={5}
                  name="url"
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
AddBlog.propTypes = {
  toggleAddNoteref: PropTypes.object.isRequired,
};

export default AddBlog;
