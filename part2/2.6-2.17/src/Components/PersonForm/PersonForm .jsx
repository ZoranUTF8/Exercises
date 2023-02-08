import { useState } from "react";
import PhonebookDbService from "../../Services/PhonebookDbService";
import Notification from "../Notification/Notification";

const PersonForm = ({
  persons,
  setPersons,
  notificationMessage,
  setNotificationMessage,
}) => {
  const [newName, setNewName] = useState({ name: "", number: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewName({ ...newName, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (checkForDuplicateName(persons, newName)) {
      alert(`${newName?.name} is already saved.`);
    } else {
      const newPerson = { name: newName.name, number: newName.number };

      PhonebookDbService.addNewPerson(newPerson).then((newPersons) =>
        setPersons(persons.concat(newPersons.data))
      );

      setNotificationMessage(
        (prevValue) =>
          (prevValue = `Person with name ${newPerson.name} has been added`)
      );

      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
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
