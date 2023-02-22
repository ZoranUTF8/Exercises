const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blogPost");
const api = supertest(app);
const helper = require("./test_helper");
const logger = require("../utils/logger");

/*
The database is cleared out at the beginning,
and after that, we save the two notes stored 
in the initialNotes array to the database. By
doing this, we ensure that the database is in
the same state before every test is run.
*/

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogPost);
});

//? Tests

describe("when there are blog posts added", () => {
  test("a specific blog post is within the returned notes", async () => {
    const response = await api.get("/api/blogs");
    const titles = response.body.map((r) => r.title);
    expect(titles).toContain("First class tests");
  });

  test("blog posts are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 100000);
  test("a specific blog post can be viewed", async () => {
    const blogStartState = await helper.blogPostsInDb();

    const blogToView = blogStartState[0];

    const blogPost = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(blogPost.body.data.id).toEqual(blogToView.id);
  });

  test("identifier property of the blog posts is named id", async () => {
    const blogPostFromDb = await helper.blogPostsInDb();

    const blogPostToView = blogPostFromDb[0];

    expect(blogPostToView.id).toBeDefined();
  });

  test("if likes property is missing from the request, it will default to the value 0", async () => {
    const newBlogPost = {
      title: "New blog post",
      author: "Some author",
      url: "http://example.com",
    };

    await api
      .post("/api/blogs")
      .send(newBlogPost)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const allBlogs = await helper.blogPostsInDb();

    const lastAddedPost = allBlogs.pop();

    expect(lastAddedPost.likes).toBe("0");
  });
  test("verify that if the title or url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request", async () => {
    const newBlogPost = {
      author: "Some author",
    };
    await api
      .post("/api/blogs")
      .send(newBlogPost)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  }, 10000);
});

describe("addition of a new blog post", () => {
  test("a valid blog post can be added", async () => {
    const newBlogPost = {
      title: "New blog post",
      author: "Some author",
      url: "http://example.com",
      likes: 20,
    };

    await api
      .post("/api/blogs")
      .send(newBlogPost)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const allBlogs = await helper.blogPostsInDb();

    expect(allBlogs).toHaveLength(helper.initialBlogPost.length + 1);

    const blogContents = allBlogs.map((n) => n.title);

    expect(blogContents).toContain("New blog post");
  }, 10000);

  test("note without content is not added", async () => {
    const newBlogPost = {
      title: "test title",
    };

    await api.post("/api/blogs").send(newBlogPost).expect(400);

    const allBlogs = await helper.blogPostsInDb();

    expect(allBlogs).toHaveLength(helper.initialBlogPost.length);
  });
});

describe("deletion of a blog post", () => {
  test("a blog post can be deleted", async () => {
    const blogPostsStartState = await helper.blogPostsInDb();
    const blogPostToDelete = blogPostsStartState[0];

    await api.delete(`/api/blogs/${blogPostToDelete.id}`).expect(204);

    const blogPostsAfterDelete = await helper.blogPostsInDb();

    expect(blogPostsAfterDelete).toHaveLength(
      helper.initialBlogPost.length - 1
    );

    const contents = blogPostsAfterDelete.map((r) => r.title);

    expect(contents).not.toContain(blogPostToDelete.title);
  }, 10000);
});

describe("update a blog post", () => {
  test.only("a valid blog post can be updated", async () => {
    const blogPostsStartState = await helper.blogPostsInDb();

    let blogPostToUpdate = blogPostsStartState[0];

    blogPostToUpdate = { ...blogPostToUpdate, likes: "20" };

    const response = await api
      .put(`/api/blogs/${blogPostToUpdate.id}`)
      .send(blogPostToUpdate);

    expect(response.status).toBe(200);

    expect(response._body.likes).toBe("20");
  }, 10000);
});

afterAll(async () => {
  await mongoose.connection.close();
});
