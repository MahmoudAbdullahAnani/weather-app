import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import date from "date-and-time";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import axios from "axios";

import { useRecoilState } from "recoil";
import { APICity, APIForecast, APIPoint } from "../Data/Atom";

// import required modules
import { Pagination } from "swiper";
function Expectations2({ cityNameE }) {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  const [urlCity, setUrlCity] = useRecoilState(APICity);
  const [urlPoint, setPoint] = useRecoilState(APIPoint);
  const [urlForecast, setForecast] = useRecoilState(APIForecast);

  const [dayData, setData] = useState([]);

  const [lon, setLon] = useState("");
  const [, setLat] = useState("");

  const getDataByPonint = () => {
    // GET request for remote image in node.js
    axios({
      method: "get",
      url: `${urlForecast}${cityNameE}`,
      responseType: "stream",
    })
      .then(function (response) {
        const { list } = JSON.parse(response.data);
        setData(list);
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
    <div className="mt-4 rounded-lg bg-box">
      <h4>{date.parse(`${dayData[0].dt_txt.slice(0, 10)}`)}</h4>
      <Swiper
        pagination={pagination}
        modules={[Pagination]}
        className="mySwiper "
      >
        {dayData.slice(10, 15).map((dayData) => {
          return (
            <SwiperSlide className="p-5">
              <div className="flex justify-around gap-3">
                <div>
                  <h3>{dayData.weather[0].main}</h3>
                  <h5>{dayData.weather[0].description}</h5>
                </div>
                <h1 className="text-white text-center">
                  {dayData.main.temp}°C
                </h1>
                <h5>{dayData.dt_txt}</h5>
              </div>
              <div className="flex flex-wrap justify-around ">
                {/* Image */}
                <div>
                  <img
                    className="w-40"
                    width={`100`}
                    height={`100`}
                    src={`http://openweathermap.org/img/w/${dayData.weather[0].icon}.png`}
                    alt={dayData.weather[0].main}
                  />
                </div>
                {/* Mind */}
                <div>
                  <div className="flex justify-start align-items-center gap-x-5   mt-3   flex-wrap">
                    <div className="text-white flex align-items-center gap-2 flex-nowrap m-0">
                      <span className="">
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.0646 11.3158C17.2274 11.3847 17.2274 11.6153 17.0646 11.6842L5.00205 16.7876C4.83055 16.8602 4.66168 16.6796 4.74556 16.5133L6.73684 12.5667L6.8265 12.385C7.10176 11.8271 7.10176 11.1729 6.8265 10.615L6.73684 10.4333L4.74556 6.48669C4.66168 6.32044 4.83055 6.13985 5.00205 6.2124L17.0646 11.3158ZM19.7776 12.4235C20.5994 12.082 20.5994 10.918 19.7776 10.5766L3.23756 3.70369C2.94126 3.58057 2.59989 3.64945 2.37451 3.87783C2.1483 4.10705 2.08438 4.45087 2.2131 4.74608L4.80937 10.7007C5.03162 11.2104 5.03162 11.7896 4.80937 12.2993L2.2131 18.2539C2.08439 18.5491 2.1483 18.8929 2.37451 19.1222C2.59989 19.3506 2.94126 19.4194 3.23756 19.2963L19.7776 12.4235Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                      <b>Wind </b>
                      <span className="fs-4">
                        {Math.round(dayData.visibility / 1000)}.0 KM
                      </span>
                    </div>

                    <div className="text-white flex align-items-center  flex-nowrap">
                      <span className="fs-2 me-4">||</span>
                      <span className="me-1">
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.0001 2.84224L6.4626 7.37975C5.56528 8.27716 4.95422 9.4205 4.70668 10.6652C4.45915 11.9099 4.58626 13.2 5.07194 14.3725C5.55762 15.5449 6.38006 16.547 7.43526 17.2521C8.49046 17.9571 9.73103 18.3335 11.0001 18.3335C12.2692 18.3335 13.5097 17.9571 14.5649 17.2521C15.6201 16.547 16.4426 15.5449 16.9283 14.3725C17.4139 13.2 17.5411 11.9099 17.2935 10.6652C17.046 9.4205 16.4349 8.27716 15.5376 7.37975L11.0001 2.84224ZM11.0001 0.249911L16.8338 6.08358C17.9875 7.23737 18.7733 8.70738 19.0916 10.3077C19.4099 11.9081 19.2465 13.5669 18.6221 15.0743C17.9977 16.5818 16.9402 17.8703 15.5835 18.7768C14.2268 19.6833 12.6318 20.1672 11.0001 20.1672C9.36841 20.1672 7.77336 19.6833 6.41666 18.7768C5.05996 17.8703 4.00253 16.5818 3.37811 15.0743C2.75368 13.5669 2.5903 11.9081 2.90862 10.3077C3.22694 8.70738 4.01266 7.23737 5.16644 6.08358L11.0001 0.249911Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                      <b className="px-3">Hum </b>
                      <span className="fs-4">{dayData.main.humidity}%</span>
                    </div>
                    <div className="text-white flex align-items-center  flex-nowrap">
                      <span className="fs-2 me-4">||</span>
                      <span className="me-1">
                        <svg
                          width="38"
                          height="21"
                          viewBox="0 0 38 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.4609 9.90673C10.4609 9.90673 27.7918 10.0657 31.5441 9.02306C35.2964 7.98046 35.2916 2.56934 31.5441 1.23548C27.7967 -0.0983674 26.5159 4.66941 26.5159 4.66941"
                            stroke="#D0D0D0"
                          />
                          <path
                            d="M14.7627 15.5931C14.7627 15.5931 27.4816 14.4937 33.0887 15.5931C38.6959 16.6926 36.9104 19.8466 34.2531 19.9908C31.5957 20.135 29.1435 18.4644 29.1435 18.4644"
                            stroke="#D0D0D0"
                          />
                          <path
                            d="M1 3.1274C1 3.1274 4.85823 3.43341 9.42998 3.43341C14.0017 3.43341 20.1985 2.85938 20.1985 2.85938"
                            stroke="#D0D0D0"
                          />
                        </svg>
                      </span>
                      <b className="px-3">Wind Speed </b>
                      <span className="fs-4">{dayData.wind.speed} km/h</span>
                    </div>
                    <div className="text-white flex align-items-center  flex-nowrap">
                      <span className="fs-2 me-4">||</span>
                      <span className="me-1">
                        <svg
                          width="23"
                          height="20"
                          viewBox="0 0 23 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.5 4.00001C16.9317 4.00001 17.7801 4.00001 17 4.00001C16 2 14 0 10.5 0C7 0 4.56176 2.12215 4 5.50001C1.78249 5.50001 0 7.74206 0 10C0.5 12.5 1 13.5 3.52173 14H17.6495C20.324 14 22.5 11.7835 22.5 9.05945C22.5 6.3354 20.1744 4.00001 17.5 4.00001ZM21.0998 8.86379C21.0998 10.869 19.4815 12.5 17.4916 12.5H4.33634C2.77226 12.5 1.4998 11.2181 1.4998 9.64235C1.4998 8.06616 2.77226 6.78392 4.33634 6.78392C4.44072 6.78392 4.55466 6.79226 4.69489 6.80934L5.15662 6.86733L5.20284 6.40337C5.48808 3.57156 7.8362 1.43607 10.6648 1.43607C12.979 1.43607 15.0558 2.91494 15.8331 5.11636L15.9801 5.53186L16.3988 5.398C16.7542 5.28519 17.1219 5.22798 17.4916 5.22798C19.4815 5.22798 21.0998 6.85899 21.0998 8.86379Z"
                            fill="white"
                          />
                          <path
                            d="M4.12309 16.0216C4.69553 17.0639 5.26797 18.1055 5.841 19.1478C6.23932 19.8731 7.352 19.2257 6.95308 18.4997C6.38064 17.4575 5.80821 16.4152 5.23517 15.373C4.83685 14.6477 3.72417 15.2951 4.12309 16.0216Z"
                            fill="white"
                          />
                          <path
                            d="M8.38549 16.0216C8.95789 17.0638 9.53029 18.1053 10.1027 19.1475C10.5016 19.8728 11.6142 19.2254 11.2153 18.4995C10.6429 17.4573 10.0705 16.4152 9.49749 15.373C9.0992 14.6477 7.986 15.2951 8.38549 16.0216Z"
                            fill="white"
                          />
                          <path
                            d="M12.8647 16.0215C13.4377 17.0635 14.01 18.105 14.5823 19.1471C14.9806 19.8723 16.0937 19.2249 15.6948 18.4991C15.1225 17.4571 14.5496 16.415 13.9772 15.3729C13.579 14.6477 12.4659 15.2951 12.8647 16.0215Z"
                            fill="white"
                          />
                          <path
                            d="M17.1934 16.0215C17.7657 17.0635 18.3386 18.105 18.911 19.147C19.3092 19.8722 20.4223 19.2249 20.0234 18.4991C19.4505 17.457 18.8782 16.415 18.3059 15.3729C17.907 14.6477 16.7945 15.2951 17.1934 16.0215Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                      <b className="px-3">Wind Deg </b>
                      <span className="fs-4">{dayData.wind.deg} km/h</span>
                    </div>
                    <div className="text-white flex align-items-center  flex-nowrap">
                      <span className="fs-2 me-4">||</span>
                      <span className="me-1">
                        <svg
                          width="23"
                          height="20"
                          viewBox="0 0 23 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.5 4.00001C16.9317 4.00001 17.7801 4.00001 17 4.00001C16 2 14 0 10.5 0C7 0 4.56176 2.12215 4 5.50001C1.78249 5.50001 0 7.74206 0 10C0.5 12.5 1 13.5 3.52173 14H17.6495C20.324 14 22.5 11.7835 22.5 9.05945C22.5 6.3354 20.1744 4.00001 17.5 4.00001ZM21.0998 8.86379C21.0998 10.869 19.4815 12.5 17.4916 12.5H4.33634C2.77226 12.5 1.4998 11.2181 1.4998 9.64235C1.4998 8.06616 2.77226 6.78392 4.33634 6.78392C4.44072 6.78392 4.55466 6.79226 4.69489 6.80934L5.15662 6.86733L5.20284 6.40337C5.48808 3.57156 7.8362 1.43607 10.6648 1.43607C12.979 1.43607 15.0558 2.91494 15.8331 5.11636L15.9801 5.53186L16.3988 5.398C16.7542 5.28519 17.1219 5.22798 17.4916 5.22798C19.4815 5.22798 21.0998 6.85899 21.0998 8.86379Z"
                            fill="white"
                          />
                          <path
                            d="M4.12309 16.0216C4.69553 17.0639 5.26797 18.1055 5.841 19.1478C6.23932 19.8731 7.352 19.2257 6.95308 18.4997C6.38064 17.4575 5.80821 16.4152 5.23517 15.373C4.83685 14.6477 3.72417 15.2951 4.12309 16.0216Z"
                            fill="white"
                          />
                          <path
                            d="M8.38549 16.0216C8.95789 17.0638 9.53029 18.1053 10.1027 19.1475C10.5016 19.8728 11.6142 19.2254 11.2153 18.4995C10.6429 17.4573 10.0705 16.4152 9.49749 15.373C9.0992 14.6477 7.986 15.2951 8.38549 16.0216Z"
                            fill="white"
                          />
                          <path
                            d="M12.8647 16.0215C13.4377 17.0635 14.01 18.105 14.5823 19.1471C14.9806 19.8723 16.0937 19.2249 15.6948 18.4991C15.1225 17.4571 14.5496 16.415 13.9772 15.3729C13.579 14.6477 12.4659 15.2951 12.8647 16.0215Z"
                            fill="white"
                          />
                          <path
                            d="M17.1934 16.0215C17.7657 17.0635 18.3386 18.105 18.911 19.147C19.3092 19.8722 20.4223 19.2249 20.0234 18.4991C19.4505 17.457 18.8782 16.415 18.3059 15.3729C17.907 14.6477 16.7945 15.2951 17.1934 16.0215Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                      <b className="px-3">Wind Gust </b>
                      <span className="fs-4">{dayData.wind.gust} km/h</span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Expectations2;
