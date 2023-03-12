import React from "react";
import noteDbServices from "../Services/NotesDbServices";
import Note from "./Note";
import PropTypes from "prop-types";

const DisplayNotes = ({ notes, setNotes, filteredNotes }) => {
  const deleteNote = (id) => {
    noteDbServices.deleteNote(id).then(() => {
      setNotes(notes.filter((note) => note.id !== id));
    });
  };

  const toggleImportance = (noteToUpdate) => {
    const updatedNote = { ...noteToUpdate, important: !noteToUpdate.important };

    noteDbServices
      .updateNote(updatedNote.id, updatedNote)
      .then((returnedNote) => {
        setNotes(
          notes.map((note) =>
            note.id !== updatedNote.id ? note : returnedNote
          )
        );
      });
  };

  if (filteredNotes.length < 1) {
    return (
      <div>
        <h1>No notes added.</h1>
      </div>
    );
  }
  return (
    <div>
      <ul>
        {filteredNotes.map((note) => (
          <Note
            key={note.id}
            {...note}
            toggleImportance={() => toggleImportance(note)}
            deleteNote={deleteNote}
          />
        ))}
      </ul>
    </div>
  );
};
DisplayNotes.propTypes = {
  notes: PropTypes.string.isRequired,
  setNotes: PropTypes.string.isRequired,
  filteredNotes: PropTypes.string.isRequired,
};

export default DisplayNotes;
