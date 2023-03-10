import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import axios from "axios";

import { useRecoilState } from "recoil";
import { APICity, APIForecast, APIPoint } from "../Data/Atom";

// import required modules
import { Pagination } from "swiper";
function Expectations({ cityNameE }) {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  const [urlCity, setUrlCity] = useRecoilState(APICity);
  const [urlPoint, setPoint] = useRecoilState(APIPoint);
  const [urlForecast, setForecast] = useRecoilState(APIForecast);
  const [lon, setLon] = useState("31.3580405");
  const [lat, setLat] = useState("30.6347746");
  // Start Get Data
  const [main, setMain] = useState("Clear");
  const [description, setDescription] = useState("clear sky");

  const [icon, setIcon] = useState("01d");
  const [img, setimg] = useState(null);

  const [temp, setTemp] = useState(0);
  const [temp_max, setTemp_max] = useState(0);
  const [temp_min, setTemp_min] = useState(0);

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
      url: `${urlForecast}${cityNameE}`,
      responseType: "stream",
    })
      .then(function (response) {
        const { list } = JSON.parse(response.data);

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
    <div className="mt-4 rounded-lg bg-green-400">
      <Swiper
        pagination={pagination}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Expectations;
