import { useState } from "react";
import Note from "./components/Note";

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState("Add new note");
  const [showINotes, setShowINotes] = useState(false);

  const filteredNotes = showINotes
    ? notes.filter((note) => note.important === true)
    : notes;

  const addNote = (event) => {
    event.preventDefault();

    const noteObject = {
      id: notes.length + 1,
      content: newNote,
      important: Math.random() < 0.5,
    };
    setNotes(notes.concat(noteObject));
    setNewNote("Add new note");
  };

  const handleChange = (e) => {
    setNewNote(e.target.value);
  };

  const setNotesToShow = () => {
    setShowINotes((prevValue) => (prevValue = !prevValue));
  };
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {filteredNotes.map((note) => (
          <Note key={note.id} content={note.content} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleChange} />
        <button type="submit">save</button>
      </form>
      <button onClick={setNotesToShow}>
        {showINotes ? "Show all notes." : "Show important"}
      </button>
    </div>
  );
};

export default App;
