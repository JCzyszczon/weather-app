"use client";
import React from 'react';
import {IoMdClose} from 'react-icons/io';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import DetailsComponent from './detailsComponent';

function WeatherModal({ closeModal, data, units }) {

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
    <section onClick={handleOutsideClick} className={`w-screen h-screen bg-[#00000099] fixed left-0 top-0 z-[1000] pt-5 pb-24 flex justify-center items-start drop-shadow-2xl overflow-y-scroll overflow-x-hidden px-3`}>
      <motion.section variants={swiperItem} initial='hidden' whileInView='show' exit='exit' viewport={{ once: false, amount: 0 }} ref={modalRef} className='!w-full !max-w-[700px] h-auto flex flex-col bg-[#fff] dark:bg-[#222222] sm:px-14 px-[5%] py-14 gap-5 relative rounded-md !box-border'>
        <button onClick={handleClose} className='absolute right-2 top-2 z-[100]'><IoMdClose className='text-3xl text-[#9399a2] hover:text-[#828891]'/></button>
        <DetailsComponent data={data} units={units}/>
      </motion.section>
    </section>
  )
}

export default WeatherModal;