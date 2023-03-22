import { useDispatch, useSelector } from "react-redux";
import Note from "./Note";
import { toggleImportanceOf } from "../reducers/noteReducer";

const DisplayNotes = () => {
  const notes = useSelector(({ filter, notes }) => {
    if (filter === "ALL") {
      return notes;
    }
    return filter === "IMPORTANT"
      ? notes.filter((note) => note.important)
      : notes.filter((note) => !note.important);
  });
  const dispatch = useDispatch(); //? dispatch function from the useDispatch hook.

  const toggleImportance = (id) => {
    dispatch(toggleImportanceOf(id));
  };

  console.log(notes);
  return (
    <ul>
      {notes.map((note) => (
        <Note note={note} handleClick={toggleImportance} key={note.id} />
      ))}
    </ul>
  );
};

export default DisplayNotes;
