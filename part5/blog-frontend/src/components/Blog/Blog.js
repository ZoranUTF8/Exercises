import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import BlogService from "../../services/BlogService";

const Blog = ({ blog, indx, setBlogs, blogs }) => {
  const updateLikeCount = async () => {
    const blogToUpdate = { ...blog, likes: Number(blog.likes) + 1 };
    const updatedBlog = await BlogService.updateBlogLikeCount(blogToUpdate);

    setBlogs(
      blogs.map((prevBlog) =>
        prevBlog.id === updatedBlog.data.id ? updatedBlog.data : prevBlog
      )
    );
  };
  return (
    <Accordion.Item eventKey={indx}>
      <Accordion.Header>
        {indx + 1}: {blog.title} by: {blog.author}
      </Accordion.Header>
      <Accordion.Body>
        <p>Author: {blog.author} </p>
        <br />
        <p>
          Url:
          <a href={blog.url} target="_blank">
            {blog.url}
          </a>
        </p>
        <br />
        <p>Likes: {blog.likes} </p>
        <Button variant="primary" size="sm" onClick={updateLikeCount}>
          Like
        </Button>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default Blog;
