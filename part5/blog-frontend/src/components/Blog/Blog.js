import { useState } from "react";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import BlogService from "../../services/BlogService";
import YesNoModal from "../Modal/YesNoModal";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const Blog = ({ blog, indx, setBlogs, blogs, user }) => {
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
    if (userIsBlogOwner(user)) {
      const response = await BlogService.deleteBlogPost(blog.id);
      setBlogs(blogs.filter((prevBlog) => prevBlog.id !== response.data.id));
      toast.success(`Blog post deleted successfully.`);
    } else {
      toast.error("You are not the blog post owner.");
    }

    toggleModal();
  };

  const userIsBlogOwner = (user) => {
    return user.blogs.includes(blog.id);
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
          <p id="single_blog_like_count">Likes: {blog.likes} </p>
          <Button
            id="single_blog_like_btn"
            variant="primary"
            size="sm"
            onClick={updateLikeCount}
          >
            Like
          </Button>
          <Button
            id="single_blog_delete_btn"
            variant="primary"
            size="sm"
            onClick={toggleModal}
            className="ms-2"
            disabled={!userIsBlogOwner(user)}
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
