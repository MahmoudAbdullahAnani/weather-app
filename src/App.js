import React, { useEffect, useState } from 'react';
import './App.css';
import Main from "./Components/Main"
import Expectations from './Components/Expectations';
import VisibilityWind from './Components/VisibilityWind';

import axios from "axios";

import { useRecoilState } from "recoil";
import { APICity, APIForecast, APIPoint } from "./Data/Atom";
import Expectations1 from './Components/Expectations1';
import Expectations2 from './Components/Expectations2';
import Expectations3 from './Components/Expectations3';
import Expectations4 from './Components/Expectations4';

function App() {
  const [urlCity, setUrlCity] = useRecoilState(APICity);
  const [urlPoint, setPoint] = useRecoilState(APIPoint);
  const [lon, setLon] = useState("31.3580405");
  const [lat, setLat] = useState("30.6347746");
  // Start Get Data
  const [main, setMain] = useState("Clear");
  const [description, setDescription] = useState("clear sky");

  const [icon, setIcon] = useState("01d");
  const [img, setimg] = useState(null);

  const [temp, setTemp] = useState(0);
  const [humidity, setHumidity] = useState(0);

  const [visibility, setVisibility] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [windDeg, setWindDeg] = useState(0);
  const [windGust, setWindGust] = useState(0);

  const [country, setCountry] = useState("Egypt");
  const [cityName, setCityName] = useState("Mansour");

  const getDataByPonint = () => {
    // GET request for remote image in node.js
    axios({
      method: "get",
      url: `${urlPoint}lon=${lon}&lat=${lat}`,
      responseType: "stream",
    })
      .then(function (response) {
        const dataWeather = JSON.parse(response.data);
        const { main } = dataWeather.weather[0];
        const { description } = dataWeather.weather[0];
        const { icon } = dataWeather.weather[0];
        setMain(main);
        setDescription(description);
        setIcon(icon);
        // temp
        const { temp } = dataWeather.main;
        const { humidity } = dataWeather.main;
        setTemp(temp);
        setHumidity(humidity);
        // visibility
        const { visibility } = dataWeather;
        const { speed } = dataWeather.wind;
        const { deg } = dataWeather.wind;
        const { gust } = dataWeather.wind;
        setVisibility(visibility);
        setWindSpeed(speed);
        setWindDeg(deg);
        setWindGust(gust);
        // country
        const { country } = dataWeather.sys;
        const { name } = dataWeather;
        setCountry(country);
        setCityName(name);
      })
      .catch((err) => console.log(err.message));
  };

  // End Get Data

  // Start Get Data Loction User
  const dataLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (data) => {
        setLon(data.coords.longitude);
        setLat(data.coords.latitude);
      },

      (err) => console.log(err)
    );
  };

  lon && getDataByPonint();

  useEffect(() => {
    dataLocation();
  }, []);
  if (temp===0) {
    return (
      <div className="modal-dialog w-100 text-white modal-fullscreen felx justify-center align-items-center   text-center ">
        <div className="flex justify-center mt-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffdf"
            strokeWidth="2"
            strokeLinecap="square"
            strokeLinejoin="round"
          >
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
            <line x1="6" y1="6" x2="6.01" y2="6"></line>
            <line x1="6" y1="18" x2="6.01" y2="18"></line>
          </svg>
        </div>
        <h1 className="px-5 text-left popup flex align-items-center justify-center">
          It seems that the service has been stopped somewhat, and this is a
          partial stop, which may be due to the internal maintenance of the
          service or some improvements that work to develop the service to
          improve the quality ... We wish you a happy day
        </h1>
      </div>
    );
  }
  return (
    <div className="App container py-5 ">
      {/* icon, description, temp, country */}
      <Main
        icon={icon}
        description={description}
        temp={temp}
        country={country}
        cityName={cityName}
      />
      <VisibilityWind
        visibility={visibility}
        windSpeed={windSpeed}
        windDeg={windDeg}
        windGust={windGust}
        humidity={humidity}
      />
      <Expectations cityNameE={cityName} />
      <Expectations1 cityNameE={cityName} />
      <Expectations2 cityNameE={cityName} />
      <Expectations3 cityNameE={cityName} />
      <Expectations4 cityNameE={cityName} />
    </div>
  );
}

export default App;
