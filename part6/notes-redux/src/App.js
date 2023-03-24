import { useEffect } from "react";
import noteServices from "./services/notes";
import { setNotes } from "./reducers/noteReducer";
import { useDispatch } from "react-redux";

import NewNote from "./components/NewNote";
import DisplayNotes from "./components/DisplayNotes";
import NotesFilter from "./components/NotesFilter";
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    noteServices
      .getAll()
      .then((notes) => {
        dispatch(setNotes(notes));
      })
      .catch((e) => {
        console.log("Error getting notes");
      });
  }, [dispatch]);

  return (
    <div>
      <NewNote />
      <NotesFilter />
      <DisplayNotes />
    </div>
  );
};

export default App;
