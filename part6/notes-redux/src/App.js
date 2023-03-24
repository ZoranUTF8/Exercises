import { useEffect } from "react";
import noteServices from "./services/notes";
import { initializeNotes } from "./reducers/noteReducer";
import { useDispatch } from "react-redux";

import NewNote from "./components/NewNote";
import DisplayNotes from "./components/DisplayNotes";
import NotesFilter from "./components/NotesFilter";
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeNotes());
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
