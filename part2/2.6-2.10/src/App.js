import { useState } from "react";
import Filter from "./Components/Filter/Filter";
import PersonForm from "./Components/PersonForm/PersonForm ";
import Numbers from "./Components/Numbers/Numbers";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [filteredPeople, setFilteredPeople] = useState(persons);
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilter = (e) => {
    setSearchTerm(e.target.value);
    if (searchTerm) {
      setFilteredPeople(
        persons.filter((obj) =>
          obj.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleFilter={handleFilter} />

      <h1>Add new person</h1>
      <PersonForm persons={persons} setPersons={setPersons} />

      <h2>Numbers</h2>

      <Numbers
        searchTerm={searchTerm}
        persons={persons}
        filteredPeople={filteredPeople}
      />
    </div>
  );
};

export default App;
