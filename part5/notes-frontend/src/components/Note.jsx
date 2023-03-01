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

export default Note;
