import React from "react";

const DisplayCountries = ({ searchTerm, filteredCountries }) => {
  console.log("inside dis", filteredCountries.length);

  if (filteredCountries.length === 1) {
    return (
      <>
        {filteredCountries.map((c) => {
          console.log(c);
          return (
            <div>
              <h1>Capital: {c.capital}</h1>
              <h1>Area: {c.area}</h1>
              <h1>Languages</h1>
              <ul>
                {c.languages.map((lng) => {
                  return <h3>{lng.name}</h3>;
                })}
              </ul>
              <img src={c.flag} />
            </div>
          );
        })}
      </>
    );
  } else if (filteredCountries.length > 10) {
    return (
      <div>
        <h1>To many matches</h1>
      </div>
    );
  } else if (filteredCountries.length > 2 || filteredCountries.length < 10) {
    return (
      <div>
        {filteredCountries.map((countrie) => (
          <h3>{countrie.name}</h3>
        ))}
      </div>
    );
  }
};

export default DisplayCountries;
