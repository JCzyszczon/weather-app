"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Icon from './icon';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { format } from 'date-fns';

function DetailsComponent({ data, units }) {

  const calculateTemp = (data, multiply) => {
    if(units.temperature === 'Fahrenheit') {
      return multiply ? (Math.round((1.8 * (data - 273.15) + 32) * 10) / 10) : (Math.round((1.8 * (data - 273.15) + 32)));
    } else {
      return multiply ? (Math.round((data - 273.15) * 10) / 10) : (Math.round(data - 273.15));
    }
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

  return (
    <>
        <section className="w-full flex flex-row justify-between items-center gap-2 border-b-2 dark:border-b-[#414143] pb-6">
            <section className="flex flex-col justify-between items-start gap-5">
                <section className="flex w-full flex-col justify-between items-start">
                    <motion.h2 variants={item} initial='hidden' whileInView='show' viewport={{ once: true, amount: 0.5 }} className='lg:text-4xl text-3xl font-[900]'>{data.city.name}</motion.h2>
                    <motion.p variants={item2} initial='hidden' whileInView='show' viewport={{ once: true, amount: 0.5 }} className='text-[#9399a2] lg:text-base text-sm sm:mt-3 mt-1'>Chance of rain: {Math.round(data.list[0].pop * 100)}%</motion.p>
                </section>
                <motion.p variants={item} initial='hidden' whileInView='show' viewport={{ once: true, amount: 0.5 }} className='lg:text-6xl sm:text-4xl text-5xl font-[900]'>{calculateTemp(data.list[0].main.temp, false)}°</motion.p>
            </section>
            <Icon name={data.list[0].weather[0].main} timezone={data.city.timezone} dt_txt={data.list[0].dt_txt} className='lg:max-h-[115px] max-h-[80px] w-auto'/>
        </section>
        <section className="w-full flex flex-col justify-between items-center gap-2 border-b-2 dark:border-b-[#414143] pt-2 pb-6">
            <h3 className='text-sm font-[900] text-[#9399a2] uppercase text-start w-full'>Today&apos;s forecast</h3>
            <div className='w-full flex justify-center items-center'>
            <Swiper slidesPerView={'auto'} spaceBetween={0} initialSlide={0} className='!w-auto !flex !justify-center !items-center !py-4 !gap-1 !bg-[#eaecef] dark:!bg-[#222222] !rounded-2xl'>
                {data.list.slice(0,5).map((forecast, index) => (
                    <SwiperSlide key={index} className='!w-auto !flex !flex-col !justify-between !items-center !gap-3 !border-r-2 dark:border-r-[#414143] last:!border-none !px-5'>
                    <motion.div variants={swiperItem} initial='hidden' whileInView='show' transition={{ duration: 0.5, delay: index * 0.15 }} viewport={{ once: true, amount: 0.5 }} className='flex flex-col justify-between items-center gap-3'>
                        <h3 className='text-[#9399a2] sm:text-sm text-xs font-[900]'>{formatLocalDate(forecast.dt_txt, data.city.timezone, false)}</h3>
                        <Icon name={forecast.weather[0].main} timezone={data.city.timezone} dt_txt={forecast.dt_txt} className='w-auto max-h-[70px] aspect-square object-contain'/>
                        <p className='lg:text-3xl text-2xl font-[900]'>{calculateTemp(forecast.main.temp, false)}°</p>
                    </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>
            </div>
        </section>
        <section className="w-full flex flex-col justify-between items-center gap-2 pt-2">
            <h3 className='text-sm font-[900] text-[#9399a2] uppercase text-start w-full'>3-day forecast</h3>
            {data.list.filter((_, index) => index % 8 === 0).slice(0,3).map((forecast, index) => (
            <motion.li key={index + forecast.dt} variants={swiperItem2} initial='hidden' whileInView='show' transition={{ duration: 0.5, delay: index * 0.15 }} viewport={{ once: true, amount: 0.5 }} className='w-full flex justify-between items-center border-b-2 dark:border-b-[#414143] last:border-none lg:px-[5%] px-[2%] pb-4'>
                <h3 className='w-full text-[#9399a2] text-base'>{formatLocalDate(forecast.dt_txt, data.city.timezone, true)}</h3>
                <div className='w-full flex justify-start items-center lg:gap-3 gap-1'>
                <Icon name={forecast.weather[0].main} timezone={data.city.timezone} dt_txt={forecast.dt_txt} className='w-auto lg:max-h-[68px] max-h-[50px] aspect-square object-contain'/>
                <p className='font-[900]'>{forecast.weather[0].main}</p>
                </div>
                <p className='w-full text-end text-lg font-[900]'>{calculateTemp(forecast.main.temp, false)}°</p>
            </motion.li>
            ))}
        </section>
    </>
  )
}

export default DetailsComponent;