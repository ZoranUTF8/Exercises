import { useState } from "react";

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState({ name: "", number: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewName({ ...newName, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (checkForDuplicateName(persons, newName)) {
      alert(`${newName.name} is already saved.`);
    } else {
      const newPerson = { name: newName.name, number: newName.number };
      setPersons(persons.concat(newPerson));
    }

    setNewName({ name: "", number: "" });
  };

  const checkForDuplicateName = (arr, newContact) => {
    return arr.some(
      (obj) => obj.name.toLowerCase() === newContact.name.toLowerCase()
    );
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        name:
        <input
          value={newName.name}
          onChange={handleChange}
          placeholder="new name"
          name="name"
          type="text"
        />{" "}
        number:
        <input
          value={newName.number}
          onChange={handleChange}
          placeholder="new number"
          name="number"
          type="number"
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
