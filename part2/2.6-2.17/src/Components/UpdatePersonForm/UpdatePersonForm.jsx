import { useState } from "react";
import PhonebookDbService from "../../Services/PhonebookDbService";

const UpdatePersonForm = ({ persons, setPersons, setNotificationMessage }) => {
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPerson({ ...newPerson, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!newPerson.name) {
      alert("Please input all the values.");
    }

    const foundPerson = persons.find(
      (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
    );

    if (foundPerson) {
      const updatedPerson = {
        ...foundPerson,
        name: newPerson.name,
        number: newPerson.number,
      };

      PhonebookDbService.updatePerson(foundPerson.id, updatedPerson)
        .then((updatedData) => {
          setPersons(
            persons.map((person) =>
              person.id !== foundPerson.id ? person : updatedData
            )
          );
          setNotificationMessage(
            (prevValue) =>
              (prevValue = `Person with name ${foundPerson.name} has been updated`)
          );
        })
        .catch((err) => {
          setNotificationMessage(
            (prevValue) => (prevValue = err.response.data.error)
          );
        });
    } else {
      setNotificationMessage(
        (prevValue) => (prevValue = `No person found with ${newPerson.name}`)
      );
    }
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
    setNewPerson({ name: "", number: "" });
  };

  return (
    <div>
      <h1>Update person</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          name:
          <input
            value={newPerson.name}
            onChange={handleChange}
            placeholder="new name"
            name="name"
            type="text"
          />{" "}
          new number:
          <input
            value={newPerson.number}
            onChange={handleChange}
            placeholder="new number"
            name="number"
            type="text"
          />
        </div>
        <div>
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePersonForm;
