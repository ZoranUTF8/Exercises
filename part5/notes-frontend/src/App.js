import "./App.css";
import { useState, useEffect } from "react";
import Login from "./pages/login/Login";
import AddNoteForm from "./components/AddNoteForm";
import noteDbServices from "./Services/NotesDbServices";
import DisplayNotes from "./components/DisplayNotes";
import Error from "./components/Error";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showINotes, setShowINotes] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    noteDbServices
      .getAllNotes()
      .then((response) => {
        setNotes(response);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  }, []);

  const filteredNotes = showINotes
    ? notes.filter((note) => note.important === true)
    : notes;

  const setNotesToShow = () => {
    setShowINotes((prevValue) => {
      const newValue = !prevValue;
      return newValue;
    });
  };

  return (
    <div>
      {user && (
        <div>
          <p>{user.name} logged in</p>
        </div>
      )}
      {user === null ? (
        <Login setUser={setUser} setErrorMessage={setErrorMessage} />
      ) : (
        <AddNoteForm
          newNote={newNote}
          setNewNote={setNewNote}
          setNotes={setNotes}
        />
      )}
      <h1>Notes</h1>
      <DisplayNotes
        setNotes={setNotes}
        filteredNotes={filteredNotes}
        notes={notes}
      />

      <button onClick={setNotesToShow}>
        {showINotes ? "Show all notes." : "Show important"}
      </button>
      <Error message={errorMessage} />
    </div>
  );
};

export default App;
