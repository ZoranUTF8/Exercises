import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Blog from "./Blog";

//? Modify the the Blog component before testing

describe("Single Blog", () => {
  test("renders the blog's title and author,", () => {
    const blog = {
      title: "Title test",
      author: "Author test",
      likes: 5,
      url: "www.test.com",
    };

    render(<Blog blog={blog} indx={0} setBlogs={() => {}} blogs={[]} />);

    const titleElement = screen.getByText(
      `1: ${blog.title} by: ${blog.author}`
    );
    const authorElement = screen.getByText(`Author: ${blog.author}`);
    const notVisibleElements = screen.queryAllByTestId("not-visible-element");

    expect(titleElement).toBeInTheDocument();
    expect(authorElement).toBeInTheDocument();
    expect(notVisibleElements).toHaveLength(2);
    expect(notVisibleElements[0]).not.toHaveClass("collapse");
    expect(notVisibleElements[1]).not.toHaveClass("collapse");
  });

  test("renders the blog's title and author, and shows URL and likes when the accordion button is clicked", async () => {
    const blog = {
      title: "Test Blog",
      author: "Test Author",
      url: "https://testblog.com",
      likes: 10,
    };
    const setBlogs = jest.fn();
    const blogs = [blog];

    render(<Blog blog={blog} indx={0} setBlogs={setBlogs} blogs={blogs} />);

    const accordionButton = screen.getByText(
      `1: ${blog.title} by: ${blog.author}`
    );

    const user = userEvent.setup();
    await user.click(accordionButton);

    const urlElement = screen.getByText(blog.url);
    const likesElement = screen.getByText(`Likes: ${blog.likes}`);

    expect(urlElement).toBeInTheDocument();
    expect(likesElement).toBeInTheDocument();
  });

  test("clicking the like button twice calls the event handler twice", async () => {
    const setBlogs = jest.fn();
    const updateLikeCountTest = jest.fn();
    const blog = {
      title: "Test Blog",
      author: "Test Author",
      url: "http://testurl.com",
      likes: 0,
    };
    const blogs = [blog];

    render(
      <Blog
        blog={blog}
        indx={0}
        setBlogs={setBlogs}
        blogs={blogs}
        updateLikeCountTest={updateLikeCountTest}
      />
    );

    const user = userEvent.setup();

    const likeBtnElement = screen.getByText("Like");

    await user.click(likeBtnElement);
    await user.click(likeBtnElement);

    expect(updateLikeCountTest.mock.calls).toHaveLength(2);
  });
});
