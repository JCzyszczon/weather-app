"use client";
import React from 'react';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaExclamationTriangle } from 'react-icons/fa';

function DeleteModal({ closeModal, deleteCity, cityIndex, cityName }) {

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

    const deleteConsent = (index) => {
        deleteCity(index);
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
        <section onClick={handleOutsideClick} className={`w-screen h-screen bg-[#00000099] fixed left-0 top-0 z-[1000] drop-shadow-2xl overflow-y-scroll overflow-x-hidden px-2`}>
            <motion.section variants={swiperItem} initial='hidden' whileInView='show' exit='exit' viewport={{ once: false, amount: 0 }} ref={modalRef} className='!w-full sm:!max-w-[500px] sm:fixed static sm:mt-0 mt-10 left-1/2 top-10 sm:-translate-x-1/2 -translate-x-0 flex flex-col items-center bg-[#fff] dark:bg-[#222222] sm:px-4 px-[5%] py-4 gap-4 h-auto rounded-md overflow-hidden !box-border'>
                <div className='w-[50px] h-[50px] bg-[#0095ff33] flex justify-center items-center rounded-full'>
                    <FaExclamationTriangle className='text-[#0095ff] text-2xl'/>
                </div>
                <p className='text-center sm:text-base text-sm'>Are you sure you want to remove <span className='font-bold'>{cityName}</span> from the list?</p>
                <div className='w-full flex justify-center items-center gap-5'>
                    <button onClick={handleClose} className='bg-[#eaecef] hover:bg-[#d9dbde] dark:bg-[#303134] dark:hover:bg-[#414245] duration-300 font-bold px-3 py-2 rounded-2xl w-[150px]'>No</button>
                    <button onClick={() => deleteConsent(cityIndex)} className='bg-[#0095ff] hover:bg-[#11a6ff] duration-300 text-[#fff] px-3 font-bold py-2 rounded-2xl w-[150px]'>Yes</button>
                </div>
            </motion.section>
        </section>
      )
}

export default DeleteModal;