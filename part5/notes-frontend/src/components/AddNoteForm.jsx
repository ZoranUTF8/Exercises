import { useState } from "react";
import noteDbServices from "../Services/NotesDbServices";

const AddNoteForm = ({ setNotes, notes, setErrorMessage, toggleVisref }) => {
  const [newNote, setNewNote] = useState("");

  const handleChange = (e) => {
    setNewNote(e.target.value);
  };

  const addNote = (event) => {
    event.preventDefault();

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };

    toggleVisref.current.toggleVisibility();
    console.log(toggleVisref.current.count);

    noteDbServices
      .createNote(noteObject)
      .then((newNoteFromDb) => {
        setNotes(notes.concat(newNoteFromDb.data));
        setNewNote("");
      })
      .catch(
        (err) => setErrorMessage(err.response.data.msg),
        setTimeout(() => {
          setErrorMessage("");
        }, 3000)
      );
  };
  return (
    <form onSubmit={addNote}>
      <input value={newNote} onChange={handleChange} placeholder="New note" />
      <button type="submit">save</button>
    </form>
  );
};

export default AddNoteForm;
