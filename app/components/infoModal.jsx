"use client";
import React from 'react';
import {IoMdClose} from 'react-icons/io';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, } from 'react-icons/fa';
import { AiOutlineGlobal } from 'react-icons/ai';
import Link from 'next/link';

function InfoModal({ closeModal }) {

  const modalRef = useRef(null);

  const [layoutOpen, setLayoutOpen] = useState(true);

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
      <motion.section variants={swiperItem} initial='hidden' whileInView='show' exit='exit' viewport={{ once: false, amount: 0 }} ref={modalRef} className='!w-full !max-w-[700px] flex flex-col bg-[#fff] dark:bg-[#222222] sm:px-14 px-[5%] py-14 gap-5 h-auto relative rounded-md overflow-hidden !box-border'>
        <button onClick={handleClose} className='absolute right-2 top-2 z-[100]'><IoMdClose className='text-3xl text-[#9399a2] hover:text-[#828891]'/></button>
        <h2 className='text-[#9399a2] sm:text-sm text-xs font-[900] uppercase text-start'>Info & credits</h2>
        <div className='flex flex-col justify-center items-start gap-3'>
            {/*<p>This app was created to check the weather of your chosen location around the world. To do this, enter the name of the selected city in the field and click the search icon.</p>
            <p>Thanks to the data collected by the <a href='https://openweathermap.org/forecast5' target='_blank' className='text-[#0095ff] hover:text-[#0084ee] underline'>OpenWeather API</a>, you can check the weather several hours or even several days in advance. Additionally, it provides a whole set of information regarding rainfall chances, etc.</p>
  <p>You can find the source code for this application on the following sources:</p>*/}
            <p>WeatherApp was created in order to deliver basic weather information at any location on the globe. Additionally, website displays weather forecast for the next hours and several days.</p>
            {/*<p>While using the app, users can add selected cities to their favourites. After going to the <Link className='text-[#0095ff] hover:text-[#0084ee] underline' href={'/favourite'}>cities section</Link>, they will be displayed with quick access to information.</p>*/}
            <p>In the <Link className='text-[#0095ff] hover:text-[#0084ee] underline' href={'/settings'}>settings section</Link> users can adjust their preferred units and the appearance of the page.</p>
            <p>Application uses <a href='https://openweathermap.org/forecast5' target='_blank' className='text-[#0095ff] hover:text-[#0084ee] underline'>OpenWeather API</a>.</p>
        </div>
        <div className='w-full flex justify-center items-center gap-5'>
            <a href='https://github.com/JCzyszczon' target='_blank'><FaGithub className='text-3xl  hover:text-[#0095ff] duration-200'/></a>
            <a href='https://jczyszczon.pl' target='_blank'><AiOutlineGlobal className='text-3xl  hover:text-[#0095ff] duration-200'/></a>
        </div>
      </motion.section>
    </section>
  )
}

export default InfoModal;