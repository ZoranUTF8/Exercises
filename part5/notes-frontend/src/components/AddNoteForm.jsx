import { useState } from "react";
import noteDbServices from "../Services/NotesDbServices";
import PropTypes from "prop-types";
const AddNoteForm = ({ setNotes, notes, setErrorMessage, toggleVisref }) => {
  const [newNote, setNewNote] = useState("");

  const handleChange = (e) => {
    setNewNote(e.target.value);
  };

  const addNote = (event) => {
    event.preventDefault();

    const noteObject = {
      content: newNote,
      important: true,
    };

    toggleVisref.current.toggleVisibility();

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
      <input
        id="newNoteInput"
        value={newNote}
        onChange={handleChange}
        placeholder="New note"
      />
      <button type="submit">save</button>
    </form>
  );
};

AddNoteForm.propTypes = {
  setNotes: PropTypes.func.isRequired,
  notes: PropTypes.array.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  toggleVisref: PropTypes.object.isRequired,
};
export default AddNoteForm;
