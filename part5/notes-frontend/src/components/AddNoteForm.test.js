import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AddNoteForm from "./AddNoteForm";
import userEvent from "@testing-library/user-event";

test("<AddNoteForm /> updates parent state and calls onSubmit", async () => {
  const createNote = jest.fn();
  const user = userEvent.setup();

  render(<AddNoteForm createNote={createNote} />);

  const input = screen.getByPlaceholderText("New note");
  const sendButton = screen.getByText("save");

  await user.type(input, "testing a form...");
  await user.click(sendButton);

  expect(createNote.mock.calls).toHaveLength(1);
  expect(createNote.mock.calls[0][0].content).toBe("testing a form...");
});
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   const response = await BlogService.addNewBlog(newBlog);

//   setBlogs(blogs.concat(response.data));

//   setNewBlog({ title: "", author: "", url: "" });
//   toast.success(
//     `A new blog ${response.data.title} ! By ${response.data.author} added.`
//   );
//   toggleAddNoteref.current.toggleVisibility();
// };

// setBlogs(blogs.concat(response.data));

// setNewBlog({ title: "", author: "", url: "" });
// toast.success(
//   `A new blog ${response.data.title} ! By ${response.data.author} added.`
// );
// toggleAddNoteref.current.toggleVisibility();
