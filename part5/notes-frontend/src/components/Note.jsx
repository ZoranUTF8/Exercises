import PropTypes from "prop-types";

const Note = ({ id, content, important, toggleImportance, deleteNote }) => {
  const importanceLevel = important ? "Not important" : "Important";

  return (
    <>
      <li>{content}</li>
      <button onClick={() => toggleImportance(id)}>
        Change to {importanceLevel}
      </button>
      <button onClick={() => deleteNote(id)}>Delete</button>
    </>
  );
};
Note.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  toggleImportance: PropTypes.string.isRequired,
  deleteNote: PropTypes.string.isRequired,
};
export default Note;
