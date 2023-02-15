import { useState } from "react";
import PhonebookDbService from "../../Services/PhonebookDbService";

const PersonForm = ({ persons, setPersons, setNotificationMessage }) => {
  const [newName, setNewName] = useState({ name: "", number: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewName({ ...newName, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (checkForDuplicateName(persons, newName)) {
      if (
        window.confirm(
          `${newName.name} is already saved, would you like to update it?`
        )
      ) {
        const personData = persons.find((p) => p.name === newName.name);

        const updatedPerson = {
          ...personData,
          name: newName.name,
          number: newName.number,
        };

        PhonebookDbService.updatePerson(personData.id, updatedPerson).then(
          (updatedData) => {
            setPersons(
              persons.map((person) =>
                person.id !== personData.id ? person : updatedData
              )
            );

            setNotificationMessage(
              (prevValue) =>
                (prevValue = `Person with name ${updatedPerson.name} has been updated`)
            );

            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);

            setNewName({ name: "", number: "" });
          }
        );
      } else {
        setNotificationMessage(
          (prevValue) => (prevValue = "Action cancelled.")
        );

        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
        return;
      }
    } else {
      const newPerson = { name: newName.name, number: newName.number };

      PhonebookDbService.addNewPerson(newPerson)
        .then((newPersons) => {
          setPersons(persons.concat(newPersons.data));
          setNotificationMessage(
            (prevValue) =>
              (prevValue = `Person with name ${newPerson.name} has been added`)
          );
        })
        .catch((err) => {
          setNotificationMessage(
            (prevValue) => (prevValue = err.response.data.error)
          );
        });
    }
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
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
          type="text"
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
