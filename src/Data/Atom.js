import { atom } from "recoil";

const APICity = atom({
  key: "textState1", // unique ID (with respect to other atoms/selectors)
  // Promasse City => weather
  default:
    "http://api.openweathermap.org/data/2.5/weather?units=metric&appid=8b0d8669ba9133ff8d9b6285663acb44&q=", // default value (aka initial value)
});
const APIPoint = atom({
  key: "textState2", // unique ID (with respect to other atoms/selectors)
  // Promasse Lon and Lat => weather
  default:
    "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=05e1a9cc0e04cef73945be985920e6f1&", // default value (aka initial value)
});
const APIForecast = atom({
  key: "textState3", // unique ID (with respect to other atoms/selectors)
  // Promasse City => forecast
  default:
    "http://api.openweathermap.org/data/2.5/forecast?units=metric&appid=05e1a9cc0e04cef73945be985920e6f1&q=", // default value (aka initial value)
});

export { APICity, APIPoint, APIForecast };
