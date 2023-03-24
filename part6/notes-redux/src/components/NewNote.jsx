import { createNote } from "../reducers/noteReducer";
import { useDispatch } from "react-redux";
import noteServices from "../services/notes";

const NewNote = () => {
  const dispatch = useDispatch(); //? dispatch function from the useDispatch hook.

  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    const newNote = noteServices.createNote(content);
    dispatch(createNote(newNote));
  };

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  );
};

export default NewNote;
