const dummy = (blogs) => 1;

const totalLikes = (blogPosts) => {
  if (blogPosts.length === 0) {
    return null; // return null if the list of blogs is empty
  }
  return blogPosts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.likes,
    0
  );
};

/* FavoriteBlog function that
receives a list of blogs as a parameter.
The function finds out which blog has the most likes.
If there are many top favorites,
 it is enough to return one of them.
 */
const favoriteBlog = (blogPosts) => {
  if (blogPosts.length === 0) {
    return null; // return null if the list of blogs is empty
  }
  return blogPosts.reduce((maxLikesBlog, currentBlog) => {
    return maxLikesBlog.likes < currentBlog.likes ? currentBlog : maxLikesBlog;
  }, blogPosts[0]);
};

/*
receives an array of blogs as a parameter.
The function returns the author who has the
largest amount of blogs. The return value also
contains the number of blogs the top author has
*/
const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null; // return null if the list of blogs is empty
  }

  const blogCountByAuthor = blogs.reduce((count, blog) => {
    count[blog.author] = (count[blog.author] || 0) + 1;
    return count;
  }, {});

  let topAuthor = "";
  let topBlogCount = 0;

  for (const author in blogCountByAuthor) {
    if (blogCountByAuthor[author] > topBlogCount) {
      topAuthor = author;
      topBlogCount = blogCountByAuthor[author];
    }
  }

  return { author: topAuthor, blogs: topBlogCount };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null; // return null if the list of blogs is empty
  }

  const likesByAuthor = blogs.reduce((likes, blog) => {
    likes[blog.author] = (likes[blog.author] || 0) + blog.likes;
    return likes;
  }, {});

  let topAuthor = "";
  let topLikes = 0;

  for (const author in likesByAuthor) {
    if (likesByAuthor[author] > topLikes) {
      topAuthor = author;
      topLikes = likesByAuthor[author];
    }
  }

  return { author: topAuthor, likes: topLikes };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
