import NewNote from "./components/NewNote";
import DisplayNotes from "./components/DisplayNotes";
import NotesFilter from "./components/NotesFilter";
const App = () => {
 
  return (
    <div>
      <NewNote />
      <NotesFilter />
      <DisplayNotes />
    </div>
  );
};

export default App;
