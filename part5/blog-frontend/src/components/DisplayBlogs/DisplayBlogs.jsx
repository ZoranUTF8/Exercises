import React from "react";
import Blog from "../Blog/Blog";

const DisplayBlogs = ({ blogs }) => {
  return (
    <div className="all-blogs-display p-5 text-center mx-auto text-white w-50">
      <h2 className="text-center mt-3">All blog posts</h2>
      <hr />
      {blogs.map((blog, indx) => (
        <Blog key={blog.id} blog={blog} indx={indx} />
      ))}
    </div>
  );
};

export default DisplayBlogs;
