import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Note from "./Note";

test("renders note content correctly", () => {
  render(
    <Note
      id={3123123}
      content={"Component testing is done with react-testing-library"}
      important={true}
      deleteNote={() => {}}
      toggleImportance={() => {}}
    />
  );

  const element = screen.getByText(
    "Component testing is done with react-testing-library"
  );
  expect(element).toBeDefined();
});

test("clicking the button calls event handler once", async () => {
  const mockHandler = jest.fn();

  render(
    <Note
      id={3123123}
      content={"Component testing is done with react-testing-library"}
      important={true}
      toggleImportance={mockHandler}
      deleteNote={() => {}}
    />
  );

  const user = userEvent.setup();
  const ChangeToNotImportantBtn = screen.getByText("Change to Not important");
  await user.click(ChangeToNotImportantBtn);

  expect(mockHandler.mock.calls).toHaveLength(1);
});

test("delete notes btn is correct", async () => {
  const mockHandler = jest.fn();
  render(
    <Note
      id={3123123}
      content={"Component testing is done with react-testing-library"}
      important={true}
      deleteNote={mockHandler}
      toggleImportance={() => {}}
    />
  );

  const user = userEvent.setup();
  const DeleteBtn = screen.getByText("Delete");
  await user.click(DeleteBtn);

  expect(mockHandler.mock.calls).toHaveLength(1);
});
