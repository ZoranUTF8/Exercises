import { useState } from "react";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import BlogService from "../../services/BlogService";
import YesNoModal from "../Modal/YesNoModal";
import PropTypes from "prop-types";

const Blog = ({ blog, indx, setBlogs, blogs }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal((prevValue) => !prevValue);

  const updateLikeCount = async () => {
    const blogToUpdate = { ...blog, likes: Number(blog.likes) + 1 };
    const updatedBlog = await BlogService.updateBlogLikeCount(blogToUpdate);

    setBlogs(
      blogs.map((prevBlog) =>
        prevBlog.id === updatedBlog.data.id ? updatedBlog.data : prevBlog
      )
    );
  };

  const deleteSingleBlog = async () => {
    const response = await BlogService.deleteBlogPost(blog.id);
    setBlogs(blogs.filter((prevBlog) => prevBlog.id !== response.data.id));

    toggleModal();
  };

  return (
    <>
      <Accordion.Item eventKey={indx}>
        <Accordion.Header>
          {indx + 1}: {blog.title} by: {blog.author}
        </Accordion.Header>
        <Accordion.Body>
          <p>Author: {blog.author} </p>
          <br />
          <p>
            Url:
            <a href={blog.url} target="_blank" rel="noreferrer">
              {blog.url}
            </a>
          </p>
          <br />
          <p>Likes: {blog.likes} </p>
          <Button variant="primary" size="sm" onClick={updateLikeCount}>
            Like
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={toggleModal}
            className="ms-2"
          >
            Delete
          </Button>
        </Accordion.Body>
      </Accordion.Item>
      {showModal && (
        <YesNoModal
          showModal={showModal}
          toggleModal={toggleModal}
          handleYes={deleteSingleBlog}
          modalMessage={`Are you sure you want to delete ${blog.title} by ${blog.author}`}
        />
      )}
    </>
  );
};
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  indx: PropTypes.number.isRequired,
  setBlogs: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
};

export default Blog;
