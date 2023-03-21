import React from "react";

/*
Note, responsible for rendering a single note,
is very simple and is not aware that the event
handler it gets as props dispatches an action.
These kinds of components are called presentational in React terminology.*/
const Note = ({ note, handleClick }) => {
  return (
    <li key={note.id} onClick={() => handleClick(note.id)}>
      {note.content} <strong>{note.important ? "important" : ""}</strong>
    </li>
  );
};

export default Note;
