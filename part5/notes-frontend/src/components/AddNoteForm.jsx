import React from "react";
import noteDbServices from "../Services/NotesDbServices";

const AddNoteForm = ({ newNote, setNewNote, setNotes }) => {
  const handleChange = (e) => {
    setNewNote(e.target.value);
  };

  const addNote = (event) => {
    event.preventDefault();

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };

    noteDbServices.createNote(noteObject).then((newNoteFromDb) => {
      setNotes(notes.concat(newNoteFromDb.note));
      setNewNote("");
    });
  };
  return (
    <form onSubmit={addNote}>
      <input value={newNote} onChange={handleChange} placeholder="New note" />
      <button type="submit">save</button>
    </form>
  );
};

export default AddNoteForm;
