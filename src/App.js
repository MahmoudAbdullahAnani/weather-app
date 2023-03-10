import React, { useEffect, useState } from 'react';
import './App.css';
import Main from "./Components/Main"
import Expectations from './Components/Expectations';
import VisibilityWind from './Components/VisibilityWind';

import axios from "axios";

import { useRecoilState } from "recoil";
import { APICity, APIForecast, APIPoint } from "./Data/Atom";

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
      .catch((err) => console.log(err));
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
    </div>
  );
}

export default App;
