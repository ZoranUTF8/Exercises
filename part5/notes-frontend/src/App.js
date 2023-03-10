import "./App.css";
import { useState, useEffect, useRef } from "react";
import Login from "./pages/login/Login";
import AddNoteForm from "./components/AddNoteForm";
import noteDbServices from "./Services/NotesDbServices";
import DisplayNotes from "./components/DisplayNotes";
import Togglable from "./components/Togglable";
import Error from "./components/Error";
import localStorageOperations from "./utils/localStorageOperations";
import { setToken } from "./Services/NotesDbServices";

const App = () => {
  const [notes, setNotes] = useState([]);

  const [showINotes, setShowINotes] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);
  const toggleVisref = useRef();


  //* Fetch data from db
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

  //* Check if user logged in
  useEffect(() => {
    const loggedInUserJSON =
      localStorageOperations.get_user_from_local_storage();
    if (loggedInUserJSON) {
      setUser(loggedInUserJSON);
      setToken(loggedInUserJSON.token);
    } else {
      console.log("No logged in user");
    }
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
        <Togglable buttonLabel="new note" ref={toggleVisref}>
          <AddNoteForm
            setNotes={setNotes}
            notes={notes}
            setErrorMessage={setErrorMessage}
            toggleVisref={toggleVisref}
          />
        </Togglable>
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
