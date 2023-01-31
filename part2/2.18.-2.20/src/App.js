import "./App.css";
import { useState, useEffect } from "react";
import DisplayCountries from "./components/DisplayCountries/DisplayCountries";
import Search from "./components/Search/Search";
import CountriesServices from "./services/CountriesServices";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(countries);

  useEffect(() => {
    CountriesServices.getAllCountries().then((res) => {
      setCountries(res);
    });
  }, []);

  const handleChange = (e) => {
    setSearchTerm((prevValue) => (prevValue = e.target.value));
    if (searchTerm) {
      setFilteredCountries(
        countries.filter((obj) =>
          obj.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  };

  return (
    <div className="App">
      <Search
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        handleChange={handleChange}
      />

      <DisplayCountries
        searchTerm={searchTerm}
        filteredCountries={filteredCountries}
      />
    </div>
  );
}

export default App;
