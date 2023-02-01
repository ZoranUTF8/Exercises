import { useEffect, useState } from "react";
import WeatherService from "../../services/WeatherService";

const DisplayWeather = ({ lat, lng }) => {
  const [weatherData, setWeatherData] = useState("");
  useEffect(() => {
    WeatherService.getCurrentWeather(lat, lng).then((res) => {
      return setWeatherData((prevValue) => (prevValue = res));
    });
  }, [lat, lng]);

  if (weatherData) {
    const { temp } = weatherData.main;
    const { main, description, icon } = weatherData.weather[0];
    const weatherIcon = `http://openweathermap.org/img/wn/${icon}@2x.png`;

    return (
      <div>
        <ul>
          <li>Local temperature: {temp} F</li>
          <li>
            Status: {main} | {description}
            <img src={weatherIcon} alt="" />
          </li>
          <li></li>
        </ul>
      </div>
    );
  } else {
    <h1>Loading..</h1>;
  }
};

export default DisplayWeather;
