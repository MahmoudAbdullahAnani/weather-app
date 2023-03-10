import { atom } from "recoil";

const APICity = atom({
  key: "textState1", // unique ID (with respect to other atoms/selectors)
  // Promasse City => weather
  default:
    "http://api.openweathermap.org/data/2.5/weather?units=metric&appid=deb1bc65cd1afa8674fe12755514a180&q=", // default value (aka initial value)
});
const APIPoint = atom({
  key: "textState2", // unique ID (with respect to other atoms/selectors)
  // Promasse Lon and Lat => weather
  default:
    "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=deb1bc65cd1afa8674fe12755514a180&", // default value (aka initial value)
});
const APIForecast = atom({
  key: "textState3", // unique ID (with respect to other atoms/selectors)
  // Promasse City => forecast
  default:
    "http://api.openweathermap.org/data/2.5/forecast?units=metric&appid=deb1bc65cd1afa8674fe12755514a180&q=", // default value (aka initial value)
});

export { APICity, APIPoint, APIForecast };
