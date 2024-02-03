"use client";
import React, { useState, useEffect } from "react";
import {BiWind} from 'react-icons/bi';
import {IoWater} from 'react-icons/io5';
import { BsFillPatchCheckFill, BsSpeedometer } from 'react-icons/bs';
import {AiFillCloseCircle, AiFillDelete, AiFillHeart, AiOutlineHeart} from 'react-icons/ai';
import { getWeatherData } from '../api/openWeather';
import Icon from './icon';
import { format } from 'date-fns';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { motion, AnimatePresence } from "framer-motion";
import MoreModal from './moreModal';
import { useRouter } from 'next/navigation';
import { TbTemperature } from 'react-icons/tb';

export default function MainPanel({ city }) {
    let cityData = [
      {
          name: "Warsaw",
      },
      {
          name: "Berlin",
      },
      {
          name: "Tokio",
      },
      {
          name: "Los Angeles",
      },
      {
          name: "Kraków",
      },
      {
          name: "Barcelona",
      },
      {
          name: "London",
      },
      {
          name: "New York",
      },
      {
          name: "Pekin",
      },
      {
          name: "Delhi",
      },
      {
          name: "Moscow",
      },
      {
          name: "Toronto",
      },
      {
          name: "Boston",
      },
      {
          name: "Cairo",
      },
      {
          name: "Istanbul",
      },
      {
          name: "Madrid",
      },
      {
          name: "Bucharest",
      },
      {
          name: "Mumbai",
      },
      {
          name: "Dhaka",
      },
      {
          name: "Washington",
      },
    ];

    const router = useRouter()
    const [weatherData, setWeatherData] = useState(null);
    const [elements, setElements] = useState(6);
    const [randomIndex, setRandomIndex] = useState(Math.floor(Math.random() * cityData.length));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clickedSlide, setClickedSlide] = useState();
    const [isFavourite, setIsFavourite] = useState(false);
    const [favObj, setFavObj] = useState([]);
    const [message, setMessage] = useState('');
    const [modalState, setModalState] = useState(false);
    const [messageTimer, setMessageTimer] = useState(null);
    const [failure, setFailure] = useState(false);
    const [units, setUnits] = useState({});

    useEffect(() => {
      const fetchWeatherData = async () => {
        try {
          let data;
          if(city) {
            const decodedCityName = city ? decodeURIComponent(city) : '';
            data = await getWeatherData(decodedCityName);
          } else {
            data = await getWeatherData(cityData[randomIndex].name);
          }
          setWeatherData(data);
          const storedFavorites = getFavoritesFromLocalStorage();
          setFavObj(storedFavorites);
          setIsFavourite(storedFavorites.includes(data.city.name));      
        } catch (error) {
          router.push('/search');
        }
      };
  
      fetchWeatherData();
    }, []);

    useEffect(() => {
      setFavObj(getFavoritesFromLocalStorage());
    }, []);

    const getFavoritesFromLocalStorage = () => {
      return JSON.parse(localStorage.getItem('favorites')) || [];
    };

    useEffect(() => {
      function handleResize() {
        if (window.innerWidth < 820) {
            setElements(5);
        } else {
            setElements(6);
        }
      }
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
      if (isModalOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
      return () => {
        document.body.style.overflow = "auto";
      };
    }, [isModalOpen]);

    useEffect(() => {
      const savedUnits = localStorage.getItem("units");
      if (savedUnits) {
        const units = JSON.parse(savedUnits);
        setUnits(units);
      }
    }, []);

    const calculateTemp = (data, multiply) => {
      if(units.temperature === 'Fahrenheit') {
        return multiply ? (Math.round((1.8 * (data - 273.15) + 32) * 10) / 10) : (Math.round((1.8 * (data - 273.15) + 32)));
      } else {
        return multiply ? (Math.round((data - 273.15) * 10) / 10) : (Math.round(data - 273.15));
      }
    }

    const calculateWindSpeed = (data) => {
      let unitString = '';
      let value = 0;

      if(units.windSpeed === 'km/h') {
        value = (Math.round((data * 3.6) * 10) / 10);
        unitString = ' km/h';
      } else if(units.windSpeed === 'Knots') {
        value = (Math.round((data * 1.94384449) * 10) / 10)
        unitString = ' knots';
      } else {
        value = (Math.round((data) * 10) / 10);
        unitString = ' m/s';
      }

      return (
        <span>{value}<span className='lg:text-2xl md:text-xl sm:text-2xl text-xl'>{unitString}</span></span>
      )
    }

    const calculatePressure = (data) => {
      let unitString = '';
      let value = 0;

      if(units.pressure === 'kPa') {
        value = (Math.round((data / 10) * 10) / 10);
        unitString = ' kPa';
      } else if(units.pressure === 'mm') {
        value = (Math.round((data * 0.7500637554) * 10) / 10)
        unitString = ' mm';
      } else {
        value = (Math.round(data));
        unitString = ' hPa';
      }

      return (
        <span>{value}<span className='lg:text-2xl md:text-xl sm:text-2xl text-xl'>{unitString}</span></span>
      )
    }

    const getData = (data) => {
      setClickedSlide(data);
      setIsModalOpen(true);
    }

    const formatLocalDate = (dt_txt, timezone, option) => {
      const timezoneOffset = timezone;
      const timestamp = Date.parse(dt_txt);
      const localTimestamp = timestamp + timezoneOffset * 1000;
      const localDate = new Date(localTimestamp);

      if(units.timeFormat === '24-Hour') {
        return option ? format(localDate, "dd/MM") : format(localDate, "HH:mm");
      } else {
        return option ? format(localDate, "dd/MM") : format(localDate, "h:mm a");
      }
    }

    const addToFavorites = (cityName) => {
      if(favObj.length < 5) {
        let updatedFavorites = [...favObj, cityName];
        setFavObj(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setIsFavourite(true);
        setMessage('Dodano do ulubionych!');
        setModalState(true);
        clearTimeout(messageTimer);
        setMessageTimer(setTimeout(() => setModalState(false), 3000));
      } else {
        setMessage('Osiągnięto maksymalną liczbę ulubionych miast!');
        setModalState(true);
        clearTimeout(messageTimer);
        setMessageTimer(setTimeout(() => setModalState(false), 3000));
        setFailure(true);
      }
    };

    const removeFromFavorites = (cityName) => {
      let updatedFavorites = favObj.filter(city => city !== cityName);
      setFavObj(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavourite(false);
      setMessage('Usunięto z ulubionych!');
      setModalState(true);
      clearTimeout(messageTimer);
      setMessageTimer(setTimeout(() => setModalState(false), 3000));
    };

    const handleFavouriteClick = () => {
      if(isFavourite) {
        removeFromFavorites(weatherData.city.name);
      } else {
        addToFavorites(weatherData.city.name);
      }
    }

    const swiperItem = {
      hidden: { opacity: 0, x: -10 },
      show: { opacity: 1, x: 0 }
    }

    const swiperItem2 = {
      hidden: { opacity: 0, y: -10 },
      show: { opacity: 1, y: 0 }
    }
  
    const item = {
      hidden: { opacity: 0, x: -10 },
      show: { opacity: 1, x: 0, transition: {
          duration: 0.75,
        } 
      }
    }

    const item2 = {
      hidden: { opacity: 0, x: -10 },
      show: { opacity: 1, x: 0, transition: {
          duration: 0.75,
          delay: 0.5,
        } 
      }
    }

    const containerFav = {
      hidden: {
          y: '-100vh',
          x: '-50%',
      },
      visible: {
          y: 0,
          x: '-50%',
          transition: {
              type: 'spring',
              duration: 0.8,
          },
      },
      exit: {
          opacity: 0,
      }
  }

    return (
      <>
      <section className='w-full h-full flex md:flex-row flex-col lg:gap-6 gap-2 md:overflow-hidden overflow-visible mainPanel'>
        <section className='md:w-3/5 w-full h-full flex flex-col justify-start items-start md:gap-6 gap-2 md:overflow-y-scroll overflow-visible rounded-2xl'>
          <section className='w-full h-auto flex sm:flex-row flex-col-reverse justify-center items-stretch lg:px-[10%] px-[5%] py-4 gap-2 relative'>
            <div className='w-full flex sm:flex-col flex-col-reverse sm:items-start items-center sm:justify-between justify-center sm:gap-0 gap-2'>
              <div className='sm:w-auto w-full sm:text-start text-center sm:block flex flex-col justify-center items-center'>
                {weatherData ? <motion.h1 variants={item} initial='hidden' whileInView='show' viewport={{ once: true, amount: 0.5 }} className='lg:text-4xl text-3xl font-[900]'>{weatherData.city.name}</motion.h1> : <div className='w-[200px] h-[40px] rounded-2xl bg-gray-300 dark:bg-[#525356] animate-pulse'></div>}
                {weatherData ? <motion.p variants={item2} initial='hidden' whileInView='show' viewport={{ once: true, amount: 0.5 }} className='text-[#9399a2] sm:text-base text-sm sm:mt-3 mt-1'>{weatherData.list[0].weather[0].description.charAt(0).toUpperCase() + weatherData.list[0].weather[0].description.slice(1)}</motion.p> : <div className='w-[130px] h-[24px] rounded-2xl bg-gray-300 dark:bg-[#525356] animate-pulse mt-3'></div> }
              </div>
              <div>
                {weatherData ? <motion.p variants={item} initial='hidden' whileInView='show' viewport={{ once: true, amount: 0.5 }} className='lg:text-6xl sm:text-4xl text-5xl font-[900]'>{calculateTemp(weatherData.list[0].main.temp, true)}°</motion.p> : <div className='w-[200px] h-[60px] rounded-2xl bg-gray-300 dark:bg-[#525356] animate-pulse'></div> }
              </div>
            </div>
            <div className='w-full h-auto flex sm:justify-end justify-center items-center py-2'>
              {weatherData ? <Icon name={weatherData.list[0].weather[0].main} timezone={weatherData.city.timezone} dt_txt={weatherData.list[0].dt_txt} className='lg:max-h-[175px] max-h-[140px] w-auto'/> : <div className='lg:w-[180px] w-[120px] aspect-square rounded-2xl bg-gray-300 dark:bg-[#525356] animate-pulse lg:mt-0 mt-2'></div> }
            </div>
            <div onClick={handleFavouriteClick} className='w-[40px] cursor-pointer h-auto absolute right-2 top-2 bg-[#eaecef] dark:bg-[#303134] group hover:scale-95 duration-200 drop-shadow-md aspect-square rounded-full flex justify-center items-center'>
              {isFavourite ? (
                <AiFillHeart className='text-2xl text-[#0095ff] group-hover:text-[#9399a2] duration-200'/>
              ) : (
                <AiOutlineHeart className='text-2xl text-[#9399a2] group-hover:text-[#0095ff] duration-200'/>
              )}
            </div>
          </section>
          <section className='w-full h-auto bg-[#eaecef] dark:bg-[#303134] rounded-2xl sm:p-5 p-4'>
            <h2 className='text-sm font-[900] text-[#9399a2] uppercase'>Today&apos;s forecast</h2>
            <div className='w-full flex justify-center items-center'>
              <Swiper slidesPerView={'auto'} spaceBetween={0} initialSlide={0} className='!w-auto !flex !justify-center !items-center !py-4 !gap-1'>
                {weatherData ? (
                  <>
                  {weatherData.list.slice(0,elements).map((data, index) => (
                    <SwiperSlide key={index} className='!w-auto !flex !flex-col !justify-between !items-center !gap-3 !border-r-2 dark:border-r-[#414143] last:!border-none !px-5'>
                      <motion.div variants={swiperItem} initial='hidden' whileInView='show' transition={{ duration: 0.5, delay: index * 0.15 }} viewport={{ once: true, amount: 0.5 }} className='flex flex-col justify-between items-center gap-3'>
                        <h3 className='text-[#9399a2] sm:text-sm text-xs font-[900]'>{formatLocalDate(data.dt_txt, weatherData.city.timezone, false)}</h3>
                        <Icon name={data.weather[0].main} timezone={weatherData.city.timezone} dt_txt={data.dt_txt} className='w-auto max-h-[70px] aspect-square object-contain'/>
                        <p className='lg:text-3xl text-2xl font-[900]'>{calculateTemp(data.main.temp, false)}°</p>
                      </motion.div>
                    </SwiperSlide>
                  ))}
                  </>
                ) : (
                  <>
                  {[...Array(6).keys()].map((i) => (
                    <div key={i} className="w-full bg-gray-300 dark:bg-[#525356] animate-pulse h-[146px] px-10 rounded-2xl"></div>
                  ))}
                  </>
                )}
              </Swiper>
            </div>
          </section>
          <section className='w-full h-full bg-[#eaecef] dark:bg-[#303134] rounded-2xl sm:p-5 p-4'>
            <section className='w-full h-auto flex justify-between items-center'>
              <h2 className='text-sm font-[900] text-[#9399a2] uppercase'>Air conditions</h2>
              {weatherData ? <button onClick={() => getData(weatherData)} className='sm:text-base text-sm bn632-hover bn26'>See more</button> : <div className='w-[90px] h-[32px] rounded-2xl bg-gray-300 dark:bg-[#525356] animate-pulse'></div>}
            </section>
            <ul className='w-full h-auto grid sm:grid-cols-2 grid-cols-2 sm:p-4 py-6 px-0 gap-5'>
              <li className='w-full h-auto flex flex-col justify-center sm:items-start items-center gap-2'>
                <div className='w-auto flex justify-between items-center text-[#9399a2] gap-2'>
                  <TbTemperature className='sm:text-2xl text-xl'/>
                  <h3 className='sm:text-lg text-base'>Real Feel</h3>
                </div>
                {weatherData ? <motion.p variants={item} initial='hidden' whileInView='show' viewport={{ once: true, amount: 0.5 }} className='lg:text-3xl md:text-xl sm:text-3xl text-2xl font-[900] sm:pl-8 pl-0'>{calculateTemp(weatherData.list[0].main.feels_like, true)}°</motion.p> : <div className='w-full h-[40px] rounded-2xl bg-gray-300 dark:bg-[#525356] animate-pulse'></div>}
              </li>
              <li className='w-full h-auto flex flex-col justify-start sm:items-start items-center gap-2'>
                <div className='w-auto flex justify-between items-center text-[#9399a2] gap-2'>
                  <BiWind className='sm:text-2xl text-xl'/>
                  <h3 className='sm:text-lg text-base'>Wind</h3>
                </div>
                {weatherData ? <motion.p variants={item} initial='hidden' whileInView='show' viewport={{ once: true, amount: 0.5 }} className='lg:text-3xl md:text-xl sm:text-3xl text-2xl font-[900] sm:pl-8 pl-0'>{calculateWindSpeed(weatherData.list[0].wind.speed)}</motion.p> : <div className='w-full h-[40px] rounded-2xl bg-gray-300 dark:bg-[#525356] animate-pulse'></div>}
              </li>
              <li className='w-full h-auto flex flex-col justify-start sm:items-start items-center gap-2'>
                <div className='w-auto flex justify-between items-center text-[#9399a2] gap-2'>
                  <IoWater className='sm:text-2xl text-xl'/>
                  <h3 className='sm:text-lg text-base'>Rain chance</h3>
                </div>
                {weatherData ? <motion.p variants={item} initial='hidden' whileInView='show' viewport={{ once: true, amount: 0.5 }} className='lg:text-3xl md:text-xl sm:text-3xl text-2xl font-[900] sm:pl-8 pl-0'>{Math.round(weatherData.list[0].pop * 100)}<span className='lg:text-2xl md:text-xl sm:text-2xl text-xl'>%</span></motion.p> : <div className='w-full h-[40px] rounded-2xl bg-gray-300 dark:bg-[#525356] animate-pulse'></div>}
              </li>
              <li className='w-full h-auto flex flex-col justify-start sm:items-start items-center gap-2'>
                <div className='w-auto flex justify-between items-center text-[#9399a2] gap-2'>
                  <BsSpeedometer className='sm:text-2xl text-xl'/>
                  <h3 className='sm:text-lg text-base'>Pressure</h3>
                </div>
                {weatherData ? <motion.p variants={item} initial='hidden' whileInView='show' viewport={{ once: true, amount: 0.5 }} className='lg:text-3xl md:text-xl sm:text-3xl text-2xl font-[900] sm:pl-8 pl-0'>{calculatePressure(weatherData.list[0].main.pressure)}</motion.p> : <div className='w-full h-[40px] rounded-2xl bg-gray-300 dark:bg-[#525356] animate-pulse'></div>}
              </li>
            </ul>
          </section>
        </section>
        <section className='md:w-2/5 w-full h-full bg-[#eaecef] dark:bg-[#303134] rounded-2xl sm:p-5 p-4 md:overflow-y-scroll overflow-visible'>
          <section className='w-full h-auto flex justify-between items-center'>
            <h2 className='text-sm font-[900] text-[#9399a2] uppercase'>5-day forecast</h2>
            {weatherData ? <p className='bg-[#f5f5f5] dark:bg-[#222] drop-shadow-md sm:text-base text-sm rounded-2xl px-3 py-1 font-bold'>{formatLocalDate(weatherData.list[0].dt_txt, weatherData.city.timezone, false)}</p> : <div className='w-[84px] h-[32px] rounded-2xl bg-gray-300 dark:bg-[#525356] animate-pulse'></div>}
          </section>
          <ul className='w-full h-auto flex flex-col justify-center items-center py-6 px-0 gap-4'>
          {weatherData ? (
            <>
            {weatherData.list.filter((_, index) => index % 8 === 0).map((data, index) => (
              <motion.li key={index + data.dt} variants={swiperItem2} initial='hidden' whileInView='show' transition={{ duration: 0.5, delay: index * 0.15 }} viewport={{ once: true, amount: 0.5 }} className='w-full flex justify-between items-center border-b-2 dark:border-b-[#414143] last:border-none lg:px-[5%] px-[2%] pb-4'>
                <h3 className='w-full text-[#9399a2] text-base'>{formatLocalDate(data.dt_txt, weatherData.city.timezone, true)}</h3>
                <div className='w-full flex justify-start items-center lg:gap-3 gap-1'>
                  <Icon name={data.weather[0].main} timezone={weatherData.city.timezone} dt_txt={data.dt_txt} className='w-auto lg:max-h-[68px] max-h-[50px] aspect-square object-contain'/>
                  <p className='font-[900]'>{data.weather[0].main}</p>
                </div>
                <p className='w-full text-end text-lg font-[900]'>{calculateTemp(data.main.temp, false)}°</p>
              </motion.li>
            ))}
            </>
          ) : (
            <>
            {[...Array(6).keys()].map((i) => (
              <li key={i} className="w-full bg-gray-300 dark:bg-[#525356] animate-pulse sm:h-[100px] h-[68px] px-10 pb-4 rounded-2xl"></li>
            ))}
            </>
          )}
          </ul>
        </section>
      </section>
      <AnimatePresence initial={false} mode='wait' onExitComplete={() => null}>
        {isModalOpen &&
          <MoreModal closeModal={() => setIsModalOpen(false)} props={clickedSlide}/>
        }
      </AnimatePresence>
      <AnimatePresence>
        {modalState && (
          <motion.div variants={containerFav} initial='hidden' animate='visible' exit='exit' viewport={{ once: false, amount: 0.5 }} className='sm:min-w-[200px] min-w-[90%] h-auto px-5 py-3 fixed sm:gap-5 gap-5 top-5 left-1/2 -translate-x-1/2 bg-[#eaecef] dark:bg-[#303134] drop-shadow-md z-[1000] rounded-2xl flex sm:justify-between justify-center items-center overflow-hidden'>
            {isFavourite ? <BsFillPatchCheckFill className='text-2xl text-[#0095ff]'/> : failure ? <AiFillCloseCircle className='text-2xl text-[#0095ff]'/> : <AiFillDelete className='text-2xl text-[#0095ff]'/>}
            <p className='text-sm font-[900]'>{message}</p>
          </motion.div>
        )}
      </AnimatePresence>
      </>
    )
}