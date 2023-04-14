import { useState } from "react";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import YesNoModal from "../Modal/YesNoModal";
import { toast } from "react-toastify";
import { updateBlogLike, deleteBlogPost } from "../../reducers/blogsReducer";
import { useSelector, useDispatch } from "react-redux";

const Blog = ({ blog, indx, setBlogs, blogs }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useSelector((store) => store.user);

  const toggleModal = () => setShowModal((prevValue) => !prevValue);

  const updateLikeCount = async () => {
    if (userIsBlogOwner(currentUser)) {
      return toast.error("You cannot like your own blog.");
    } else {
      return dispatch(updateBlogLike({ ...blog }));
    }
  };

  const deleteSingleBlog = async () => {
    userIsBlogOwner(currentUser) && dispatch(deleteBlogPost(blog.id));
    toast.error("You cannot delete other users blogs.");
    toggleModal();
  };

  const userIsBlogOwner = (currentUser) => {
    console.log(blog.user, currentUser.id);
    return blog.user === currentUser.id;
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

export default Blog;
