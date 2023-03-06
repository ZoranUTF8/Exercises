const Blog = ({ blog, indx }) => (
  <div>
    {indx+1}:{" "} {blog.title} {blog.author}
  </div>
);

export default Blog;
