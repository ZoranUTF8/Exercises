import DisplayWeather from "./DisplayWeather";

const DisplayCountries = ({ searchTerm, filteredCountries }) => {
  if (filteredCountries.length === 1) {
    const [lat, lng] = filteredCountries[0].latlng;

    return (
      <>
        {filteredCountries.map((c) => {
          return (
            <div key={c.population}>
              <DisplayWeather lat={lat} lng={lng} />
              <h1>Capital: {c.capital}</h1>
              <h1>Area: {c.area}</h1>
              <h1>Languages</h1>
              <ul>
                {c.languages.map((lng, indx) => {
                  return (
                    <h3 key={indx}>
                      {lng.name}
                      {c.population}
                    </h3>
                  );
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
          <h3 key={countrie.population}>{countrie.name}</h3>
        ))}
      </div>
    );
  }
};

export default DisplayCountries;
