import { useDispatch, useSelector } from "react-redux";
import Note from "./Note";
import { toggleImportanceOf } from "../reducers/noteReducer";

const DisplayNotes = () => {
  const notes = useSelector(({ filter: { filterOption }, notes }) => {

    if (filterOption === "ALL") {
      return notes;
    }
    return filterOption === "IMPORTANT"
      ? notes.filter((note) => note.important)
      : notes.filter((note) => !note.important);
  });
  const dispatch = useDispatch(); //? dispatch function from the useDispatch hook.

  const toggleImportance = (id) => {
    dispatch(toggleImportanceOf(id));
  };

  return (
    <ul>
      {notes.map((note) => (
        <Note note={note} handleClick={toggleImportance} key={note.id} />
      ))}
    </ul>
  );
};

export default DisplayNotes;
