import React from "react";
import PhonebookDbService from "../../Services/PhonebookDbService";

const Numbers = ({ searchTerm, persons, filteredPeople, setPersons }) => {
  const deletePerson = (person) => {
    if (window.confirm(`Do you really want delete ${person.name}`)) {
      PhonebookDbService.deleteNewPerson(person.id).then((res) => {
        setPersons((prevPersons) =>
          prevPersons.filter((oldPerson) => oldPerson.id !== person.id)
        );
        return window.alert(`${res.status} | ${res.msg}`);
      });
    }
  };
  return (
    <div>
      {searchTerm === ""
        ? persons?.map((person) => (
            <li key={person.name}>
              Name: {person.name} | Number: {person.number} <br />{" "}
              <button onClick={() => deletePerson(person)}>Delete</button>
            </li>
          ))
        : filteredPeople.map((person) => (
            <li key={person.name}>
              Name: {person.name} | Number: {person.number}{" "}
              <button onClick={() => deletePerson(person)}>Delete</button>
            </li>
          ))}
    </div>
  );
};

export default Numbers;
