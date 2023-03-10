import React, { useEffect, useState } from "react";
import date from "date-and-time";
import { useRecoilState } from "recoil";
import { APIPoint, CitysEG } from "../Data/Atom";
import axios from "axios";

function Main({ icon, description, temp, country, cityName }) {
  const now = new Date();
  const [cityEG, ] = useRecoilState(CitysEG);
  const [citySelect, setCitySelect] = useState("");
  const [urlPoint, ] = useRecoilState(APIPoint);
  // Start Get Data
  const [, setMainSelect] = useState("Clear");
  const [descriptionSelect, setDescriptionSelect] = useState("clear sky");

  const [iconSelect, setIconSelect] = useState("01d");

  const [tempSelect, setTempSelect] = useState(0);
  const [humiditySelect, setHumiditySelect] = useState(0);

  const [visibilitySelect, setVisibilitySelect] = useState(0);
  const [windSpeedSelect, setWindSpeedSelect] = useState(0);
  const [windDegSelect, setWindDegSelect] = useState(0);
  const [windGustSelect, setWindGustSelect] = useState(0);

  const [countrySelect, setCountrySelect] = useState("Egypt");
  const [cityNameSelect, setCityNameSelect] = useState("Mansour");
  const getDataByPonint = () => {
    // GET request for remote image in node.js
    cityEG &&
      axios({
        method: "get",
        url: `${urlPoint}lon=${citySelect.slice(0, 7)}&lat=${citySelect.slice(
          10
        )}`,
        responseType: "stream",
      })
        .then(function (response) {
          const dataWeather = JSON.parse(response.data);
          const { main } = dataWeather.weather[0];
        const { description } = dataWeather.weather[0];
        const { icon } = dataWeather.weather[0];
        setMainSelect(main);
        setDescriptionSelect(description);
        setIconSelect(icon);
        // temp
        const { temp } = dataWeather.main;
        const { humidity } = dataWeather.main;
        setTempSelect(temp);
        setHumiditySelect(humidity);
        // visibility
        const { visibility } = dataWeather;
        const { speed } = dataWeather.wind;
        const { deg } = dataWeather.wind;
        const { gust } = dataWeather.wind;
        setVisibilitySelect(visibility);
        setWindSpeedSelect(speed);
        setWindDegSelect(deg);
        setWindGustSelect(gust);
        // country
        const { country } = dataWeather.sys;
        const { name } = dataWeather;
        setCountrySelect(country);
        setCityNameSelect(name);
        })
        .catch((err) => console.log(err.message));
  };

  // End Get Data
  const [lon, setLon] = useState("31.3580405");
  const [, setLat] = useState("30.6347746");
  // Start Get Data Loction User
  const dataLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (data) => {
        setLon(data.coords.longitude);
        setLat(data.coords.latitude);
        getDataByPonint();
      },

      (err) => console.log(err)
    );
  };

  

  useEffect(() => {
    dataLocation();
  }, []);
  return (
    <div>
      {/* Image */}
      <div className="row align-items-center text-center justify-around gap-3  flex-wrap-reverse">
        <div className="col-xs-10 col-md-5 col-lg-3">
          <img
            className="w-56 mx-auto"
            width={`100`}
            height={`100`}
            src={`http://openweathermap.org/img/w/${icon}.png`}
            alt={`${description}`}
          />
        </div>
        <div className="col-xs-10 col-md-5 col-lg-3">
          <h1 className="text-7xl text-white ">{Math.round(temp)}°C</h1>
          <h3 className="text-white flex gap-2 justify-center text-center align-items-center m-0">
            <svg
              width="32"
              height="44"
              viewBox="0 0 32 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.9993 10.3447C14.8347 10.3447 13.6964 10.6977 12.7281 11.359C11.7598 12.0203 11.0052 12.9603 10.5595 14.06C10.1139 15.1597 9.99728 16.3698 10.2245 17.5372C10.4517 18.7047 11.0124 19.777 11.8359 20.6187C12.6593 21.4604 13.7084 22.0336 14.8506 22.2658C15.9927 22.498 17.1766 22.3789 18.2525 21.9233C19.3284 21.4678 20.2479 20.6964 20.8949 19.7067C21.5419 18.717 21.8872 17.5534 21.8872 16.3631C21.8854 14.7675 21.2645 13.2377 20.1607 12.1095C19.0569 10.9812 17.5603 10.3465 15.9993 10.3447ZM15.9993 19.3723C15.417 19.3723 14.8478 19.1958 14.3637 18.8651C13.8796 18.5345 13.5022 18.0645 13.2794 17.5147C13.0566 16.9648 12.9983 16.3598 13.1119 15.776C13.2255 15.1923 13.5058 14.6561 13.9176 14.2353C14.3293 13.8144 14.8539 13.5278 15.4249 13.4117C15.996 13.2956 16.5879 13.3552 17.1259 13.583C17.6638 13.8107 18.1236 14.1964 18.4471 14.6913C18.7706 15.1861 18.9432 15.7679 18.9432 16.3631C18.9423 17.1609 18.6319 17.9258 18.08 18.4899C17.5281 19.054 16.7798 19.3714 15.9993 19.3723Z"
                fill="#F8F8F8"
              />
              <path
                d="M27.3135 4.78885C24.5161 1.93016 20.7818 0.231987 16.8315 0.0220719C12.8811 -0.187844 8.9947 1.10538 5.92233 3.65215C2.84995 6.19892 0.809411 9.8187 0.194532 13.8129C-0.420346 17.807 0.434026 21.8924 2.59275 25.2805L13.7161 42.735C13.9637 43.1234 14.3021 43.4425 14.7008 43.6634C15.0995 43.8843 15.5458 44 15.9993 44C16.4528 44 16.8991 43.8843 17.2978 43.6634C17.6965 43.4425 18.035 43.1234 18.2825 42.735L29.4062 25.2805C31.4093 22.1376 32.2945 18.3863 31.9135 14.6555C31.5325 10.9248 29.9084 7.44124 27.3135 4.78885ZM26.9396 23.638L15.9994 40.8044L5.05907 23.638C1.7103 18.3833 2.42854 11.3512 6.76686 6.91662C7.97928 5.67732 9.41863 4.69424 11.0028 4.02353C12.5869 3.35283 14.2847 3.00762 15.9994 3.00762C17.714 3.00762 19.4119 3.35283 20.996 4.02353C22.5801 4.69424 24.0194 5.67732 25.2319 6.91662C29.5702 11.3512 30.2883 18.3833 26.9396 23.638Z"
                fill="#F8F8F8"
              />
            </svg>
            <span className="my-3 ">
              {country} / {cityName}
            </span>
          </h3>
          <h3 className="text-white flex gap-2 justify-center text-center align-items-center m-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="#ffffff"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>

            <span className="mb-1">{date.format(now, "DD, MMMM YYYY")}</span>
          </h3>
          <h3 className="text-white flex gap-2 justify-center text-center align-items-center m-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="#ffffff"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span className="mb-1">{date.format(now, "dddd HH:mm")}</span>
          </h3>
        </div>
        {/* Data */}
        <div className="col-xs-10 col-md-5 col-lg-3">
          <div>
            <select
              className="px-4 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500  font-semibold fs-4"
              name="cars"
              onChange={(e) => setCitySelect(e.target.value)}
              id="cars"
            >
              {cityEG.map((cityEGYPT) => {
                return (
                  <option
                    value={`${cityEGYPT.lat} | ${cityEGYPT.lng}`}
                    key={cityEGYPT.city}
                  >
                    {cityEGYPT.city}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
