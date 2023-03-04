import React from "react";
import Blog from "../Blog/Blog";

const DisplayBlogs = ({ blogs }) => {
  return (
    <div>
      <h2>All blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default DisplayBlogs;
