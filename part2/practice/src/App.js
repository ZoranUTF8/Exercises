import "./App.css";
import { useState, useEffect } from "react";
import noteDbServices from "./Services/NotesDbServices";

import Note from "./components/Note";
import Error from "./components/Error";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showINotes, setShowINotes] = useState(false);
  const [errorMessage, setErrorMessage] = useState("some error happened...");

  const handleChange = (e) => {
    setNewNote(e.target.value);
  };

  useEffect(() => {
    noteDbServices.getAllNotes().then((response) => {
      setNotes(response);
    });
  }, []);

  const filteredNotes = showINotes
    ? notes.filter((note) => note.important === true)
    : notes;

  const addNote = (event) => {
    event.preventDefault();

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };

    noteDbServices.createNote(noteObject).then((newNote) => {
      setNotes(notes.concat(newNote.note));
      setNewNote("");
    });
  };

  const deleteNote = (id) => {
    noteDbServices.deleteNote(id).then((res) => {
      setNotes(notes.filter((note) => note.id !== id));
    });
  };

  const setNotesToShow = () => {
    setShowINotes((prevValue) => (prevValue = !prevValue));
  };

  //! Add update note to backend
  const toggleImportance = (noteToUpdate) => {
    noteToUpdate.important = !noteToUpdate.important;

    noteDbServices
      .updateNote(noteToUpdate.id, noteToUpdate)
      .then((returnedNote) => {
        setNotes(
          notes.map((note) =>
            note.id !== noteToUpdate.id ? note : returnedNote
          )
        );
      });
  };

  return (
    <div>
      <h1>Notes</h1>
      <Error message={errorMessage} />
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
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleChange} placeholder="New note" />
        <button type="submit">save</button>
      </form>
      <button onClick={setNotesToShow}>
        {showINotes ? "Show all notes." : "Show important"}
      </button>
    </div>
  );
};

export default App;
