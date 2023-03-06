import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import BlogService from "../../services/BlogService";
import { toast } from "react-toastify";

const AddBlog = ({ setBlogs, blogs }) => {
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

  const handleChange = (e) => {
    setNewBlog((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await BlogService.addNewBlog(newBlog);

    setBlogs(blogs.concat(response.data));
    
    setNewBlog({ title: "", author: "", url: "" });
    toast.success(
      `A new blog ${response.data.title} ! By ${response.data.author} added.`
    );
  };

  return (
    <div className="text-center">
      <h2>AddBlog</h2>
      <Container>
        <Row className="justify-content-center mb-3">
          <Col md={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formTitle">
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

              <Form.Group controlId="formAuthor">
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

              <Form.Group controlId="formUrl">
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

export default AddBlog;
