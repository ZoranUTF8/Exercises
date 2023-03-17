import React from "react";
import Blog from "../Blog/Blog";
import Accordion from "react-bootstrap/Accordion";
import PropTypes from "prop-types";

const DisplayBlogs = ({ blogs, setBlogs, user }) => {
  return (
    <div className=" text-center mx-auto w-100 ">
      <div className="all-blogs-display  mb-3">
        <h2 className="mt-3">Published blog posts</h2>
      </div>
      <div>
        <div className="all-blogs">
          <Accordion defaultActiveKey="0">
            {blogs
              .sort((a, b) => {
                return b.likes - a.likes;
              })
              .map((blog, indx) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  indx={indx}
                  setBlogs={setBlogs}
                  blogs={blogs}
                  user={user}
                />
              ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};
DisplayBlogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
};
export default DisplayBlogs;
