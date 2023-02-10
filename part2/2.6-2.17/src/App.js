import "./App.css";
import { useState, useEffect } from "react";
import PhonebookDbService from "./Services/PhonebookDbService";
import Filter from "./Components/Filter/Filter";
import PersonForm from "./Components/PersonForm/PersonForm ";
import Numbers from "./Components/Numbers/Numbers";
import UpdatePersonForm from "./Components/UpdatePersonForm/UpdatePersonForm";
import Notification from "./Components/Notification/Notification";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState(persons);
  const [searchTerm, setSearchTerm] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    PhonebookDbService.getAllPersons().then((allPersons) =>
      setPersons(allPersons)
    );
  }, []);

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
      {notificationMessage && <Notification message={notificationMessage} />}
      <h2>Phonebook</h2>

      <Filter handleFilter={handleFilter} />
      <UpdatePersonForm persons={persons} setPersons={setPersons} />

      <h1>Add new person</h1>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        notificationMessage={notificationMessage}
        setNotificationMessage={setNotificationMessage}
      />

      <h2>Numbers</h2>

      <Numbers
        searchTerm={searchTerm}
        persons={persons}
        filteredPeople={filteredPeople}
        setPersons={setPersons}
      />
    </div>
  );
};

export default App;
