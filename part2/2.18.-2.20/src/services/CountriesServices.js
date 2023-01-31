import axios from "axios";
const baseUrl = "https://restcountries.com/v2/all";

const getAllCountries = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export default { getAllCountries };
