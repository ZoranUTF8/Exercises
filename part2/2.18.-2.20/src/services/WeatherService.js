import axios from "axios";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
const iconUrl = " http://openweathermap.org/img/wn/";

const getCurrentWeather = (lat, lng) => {
  const request = axios.get(
    `${baseUrl}lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_API_KEY}`
  );

  return request.then((response) => response.data);
};

const getCurrentWeatherIcon = (iconCode) => {
  const request = axios.get(`${iconUrl}${iconCode}@2x.png`);
  return request.then((response) => response.json());
};

export default { getCurrentWeather, getCurrentWeatherIcon };
