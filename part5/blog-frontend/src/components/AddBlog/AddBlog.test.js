import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AddBlog from "./AddBlog";

//? Modify the the Blog component before testing

describe("The form calls the event handler it received as props with the right details when a new blog is created", () => {
  test("form calls event handler with correct details when a new blog is created", async () => {
    const setBlogs = jest.fn();
    const toggleAddNoteref = { current: { toggleVisibility: jest.fn() } };
    const testSubmit = jest.fn();
    const blogs = [];

    render(
      <AddBlog
        setBlogs={setBlogs}
        blogs={blogs}
        toggleAddNoteref={toggleAddNoteref}
        testSubmit={testSubmit}
      />
    );

    // Fill out the form inputs with test values
    const titleInput = screen.getByLabelText("Title");
    const authorInput = screen.getByLabelText("Author");
    const urlInput = screen.getByLabelText("URL");
    const submitButton = screen.getByText("Submit");

    await userEvent.type(titleInput, "Test Blog");
    await userEvent.type(authorInput, "Test Author");
    await userEvent.type(urlInput, "https://test-blog.com");

    // Submit the form
    await userEvent.click(submitButton);

    // Check if the event handler was called with the correct details
    // expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(testSubmit).toHaveBeenCalledWith({
      title: "Test Blog",
      author: "Test Author",
      url: "https://test-blog.com",
    });
  });
});
