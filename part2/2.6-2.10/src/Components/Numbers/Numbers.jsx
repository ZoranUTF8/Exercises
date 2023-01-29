import React from "react";

const Numbers = ({ searchTerm, persons, filteredPeople }) => {
  return (
    <div>
      {searchTerm === ""
        ? persons.map((person) => (
            <li key={person.name}>
              Name: {person.name} | Number: {person.number}
            </li>
          ))
        : filteredPeople.map((person) => (
            <li key={person.name}>
              Name: {person.name} | Number: {person.number}
            </li>
          ))}
    </div>
  );
};

export default Numbers;
