import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, ListGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import { addBlogComment, updateBlogLike } from "../../reducers/blogsReducer";

const SingleBlogView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const { currentUser } = useSelector((store) => store.user);
  const allBlogs = useSelector((state) => state.blogs);
  const blog = allBlogs.find((blog) => blog.id === id);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addBlogComment(blog.id, comment));
    setComment("");
  };

  const updateLikeCount = async () => {
    if (userIsBlogOwner(currentUser)) {
      return toast.error("You cannot like your own blog.");
    } else {
      return dispatch(updateBlogLike({ ...blog }));
    }
  };

  const userIsBlogOwner = (currentUser) => {
    return blog.user.id === currentUser.id;
  };

  const formatDate = (dateIn) => {
    const date = new Date(dateIn);
    if (isNaN(date.getTime())) {
      return "Invalid date";
    } else {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
  };

  if (!blog) return <h1>Loading...</h1>;

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card border-info">
            <div className="card-body">
              <h3 className="card-title text-center">Title: {blog.title}</h3>
              <p className="card-text text-center">Author: {blog.author}</p>
              <hr />
              <p className="card-text text-center">URL: {blog.url}</p>
              <hr />
              <p className="card-text text-center">
                Created at: {formatDate(blog.createdAt)}
              </p>
              <hr />
              <h5 className="text-center">Comments</h5>
              <ListGroup className=" p-3 shadow hover">
                {blog.comments.length > 0 ? (
                  blog.comments.map((comment, index) => (
                    <ListGroup.Item key={index}>
                      {comment.commentText} created at:{" "}
                      {formatDate(comment.createdAt)}
                    </ListGroup.Item>
                  ))
                ) : (
                  <h5>No comments.</h5>
                )}
              </ListGroup>
              <hr />
              <Button
                id="single_blog_like_btn"
                variant="primary"
                size="sm"
                onClick={updateLikeCount}
              >
                Likes: {blog.likes}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <h4 className="text-center">Add Comment</h4>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Enter comment"
                value={comment}
                required
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Add Comment
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SingleBlogView;
