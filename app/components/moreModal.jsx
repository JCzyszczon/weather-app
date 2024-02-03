"use client";
import React from 'react';
import {IoMdClose} from 'react-icons/io';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {IoWater} from 'react-icons/io5';
import {FaUserFriends, FaShower, FaCloud, FaEye} from 'react-icons/fa';
import { getUvData } from '../api/openWeather';

const formatPopulation = (population) => {
  const num = parseInt(population, 10);
  if (isNaN(num)) {
    return population;
  }

  if (num >= 1000000) {
    const millions = (num / 1000000).toFixed(2);
    return millions + 'M';
  } else if (num >= 1000) {
    const thousands = (num / 1000).toFixed(2);
    return thousands + 'K';
  } else {
    return num.toString();
  }
};

function MoreModal({ closeModal, props }) {

  const modalRef = useRef(null);

  const [layoutOpen, setLayoutOpen] = useState(true);
  const [airPollution, setAirPollution] = useState();
  const [units, setUnits] = useState({});

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await getUvData(props.city.coord);
        data.list[0].main.aqi === 1 ? setAirPollution('Good') : data.list[0].main.aqi === 2 ? setAirPollution('Fair') : data.list[0].main.aqi === 3 ? setAirPollution('Moderate') : data.list[0].main.aqi === 4 ? setAirPollution('Poor') : setAirPollution('Very Poor');
      } catch (error) {
        console.error('Błąd podczas pobierania danych pogodowych', error);
      }
    };

    fetchWeatherData();
  }, [props]);

  useEffect(() => {
    const savedUnits = localStorage.getItem("units");
    if (savedUnits) {
      const units = JSON.parse(savedUnits);
      setUnits(units);
    }
  }, []);

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setLayoutOpen(false);
      closeModal();
    }
  };

  const handleClose = () => {
    setLayoutOpen(false);
    closeModal();
  }

  const calculateDistance = (data) => {
    let unitString = '';
    let value = 0;

    if(units.distance === 'Miles') {
      value = (Math.round((data * 0.000621371192) * 10) / 10);
      unitString = ' Mi';
    } else {
      value = (Math.round(data / 1000));
      unitString = ' Km';
    }

    return (
      <span>{value}<span className='lg:text-2xl md:text-xl sm:text-2xl text-xl'>{unitString}</span></span>
    )
  }

  const swiperItem = {
    hidden: { width: 0, opacity: 0},
    show: { 
        width: '100%',
        opacity: 1,
        transition: {
            type: "twin",
            duration: 0.4,
        },
    },
    exit: { width: 0, opacity: 0 }
  }

  return (
    <section onClick={handleOutsideClick} className={`w-screen h-screen bg-[#00000099] fixed left-0 top-0 z-[1000] flex justify-center items-center drop-shadow-2xl overflow-y-scroll overflow-x-hidden px-2`}>
      <motion.section variants={swiperItem} initial='hidden' whileInView='show' exit='exit' viewport={{ once: false, amount: 0 }} ref={modalRef} className='!w-full !max-w-[700px] flex flex-col bg-[#fff] dark:bg-[#222] sm:px-14 px-[5%] py-14 gap-5 h-auto relative rounded-md overflow-hidden !box-border'>
        <button onClick={handleClose} className='absolute right-2 top-2 z-[100]'><IoMdClose className='text-3xl text-[#9399a2] hover:text-[#828891]'/></button>
        <h2 className='text-[#9399a2] sm:text-sm text-xs font-[900] uppercase text-start'>Weather Details</h2>
        <motion.ul className='w-full grid sm:grid-cols-2 grid-cols-1 gap-2'>
          <li className='w-full h-auto flex flex-col justify-start sm:items-start items-center gap-2 bg-gray-100 dark:bg-[#303134] rounded-2xl px-5 py-2'>
              <div className='w-auto flex justify-between items-center text-[#9399a2] gap-2'>
                <FaUserFriends className='sm:text-2xl text-xl'/>
                <h3 className='sm:text-lg text-base'>City population</h3>
              </div>
              <motion.p className='text-2xl font-[900] sm:pl-8 pl-0'>{formatPopulation(props.city.population)}</motion.p>
          </li>
          <li className='w-full h-auto flex flex-col justify-start sm:items-start items-center gap-2 bg-gray-100 dark:bg-[#303134] rounded-2xl px-5 py-2'>
              <div className='w-auto flex justify-between items-center text-[#9399a2] gap-2'>
                <FaShower className='sm:text-2xl text-xl'/>
                <h3 className='sm:text-lg text-base'>Humidity</h3>
              </div>
              <motion.p className='text-2xl font-[900] sm:pl-8 pl-0'>{props.list[0].main.humidity}<span className='text-xl'>%</span></motion.p>
          </li>
          <li className='w-full h-auto flex flex-col justify-start sm:items-start items-center gap-2 bg-gray-100 dark:bg-[#303134] rounded-2xl px-5 py-2'>
              <div className='w-auto flex justify-between items-center text-[#9399a2] gap-2'>
                <FaCloud className='sm:text-2xl text-xl'/>
                <h3 className='sm:text-lg text-base'>Cloudiness</h3>
              </div>
              <motion.p className='text-2xl font-[900] sm:pl-8 pl-0'>{props.list[0].clouds.all}<span className='text-xl'>%</span></motion.p>
          </li>
          <li className='w-full h-auto flex flex-col justify-start sm:items-start items-center gap-2 bg-gray-100 dark:bg-[#303134] rounded-2xl px-5 py-2'>
              <div className='w-auto flex justify-between items-center text-[#9399a2] gap-2'>
                <FaEye className='sm:text-2xl text-xl'/>
                <h3 className='sm:text-lg text-base'>Visibility</h3>
              </div>
              <motion.p className='text-2xl font-[900] sm:pl-8 pl-0'>{calculateDistance(props.list[0].visibility)}</motion.p>
          </li>
          <li className='w-full h-auto flex flex-col justify-start sm:items-start items-center gap-2 bg-gray-100 dark:bg-[#303134] rounded-2xl px-5 py-2 relative overflow-hidden'>
              <div className='w-auto flex justify-between items-center text-[#9399a2] gap-2'>
                <IoWater className='sm:text-2xl text-xl'/>
                <h3 className='sm:text-lg text-base'>Air Quality</h3>
              </div>
              {airPollution ? <motion.p className='text-2xl font-[900] sm:pl-8 pl-0'>{airPollution}</motion.p> : <div className='w-full h-[32px] bg-gray-300 animate-pulse rounded-2xl'></div> }
              <span className={`w-[9px] absolute duration-300 right-0 top-0 ${airPollution ? 'h-full' : 'h-0'} ${airPollution === 'Good' || airPollution === 'Fair' ? 'bg-[#23c552]' : airPollution === 'Moderate' ? 'bg-[#FFC107]' : 'bg-[#F84F31]'}`}></span>
          </li>
        </motion.ul>
      </motion.section>
    </section>
  )
}

export default MoreModal;