"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import OfferImage from '../img/pexels-brett-sayles-1431822.jpg';
import ThemeSwitch from "../components/themeSwitch";

export default function Home() {

  const [units, setUnits] = useState({
    temperature: "Celsius",
    windSpeed: "km/h",
    pressure: "hPa",
    distance: "Kilometers",
    timeFormat: "12-Hour"
  });

  const [loadingUnits, setLoadingState] = useState(true);

  const modalRef = useRef(null);

  useEffect(() => {
    const savedUnits = localStorage.getItem("units");
    if (savedUnits) {
      setUnits(JSON.parse(savedUnits));
      setLoadingState(false);
    } else {
      setUnits(units);
      localStorage.setItem("units", JSON.stringify(units));
      setLoadingState(false);
    }
  }, []);

  const handleUnitChange = (category, unit) => {
    const newUnits = { ...units, [category]: unit };
    setUnits(newUnits);
    localStorage.setItem("units", JSON.stringify(newUnits));
  };

  const swiperItem = {
    hidden: { width: '100%', opacity: 0},
    show: { 
        width: '100%',
        opacity: 1,
        transition: {
            type: "twin",
            duration: 0.4,
            delay: 1,
        },
    },
    exit: { width: 0, opacity: 0 }
  }

  const cardVariants = {
    offscreen: {
      filter: 'blur(2px)',
    },
    onscreen: {
      filter: 'blur(0px)',
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.8,
      },
    },
  };

  return (
    <main className="w-full flex justify-center items-center md:flex-row flex-col lg:gap-6 gap-2 md:overflow-hidden overflow-visible mainPanel">
      <section ref={modalRef} className="md:w-3/5 w-full h-full flex flex-col bg-[#eaecef] dark:bg-[#303134] justify-start items-start p-5 md:gap-5 gap-4 md:overflow-y-scroll overflow-visible rounded-2xl">
        <h1 className="w-auto lg:min-w-[40%] sm:min-w-[80%] min-w-full md:text-start text-center text-2xl font-[700] pl-2">Units</h1>
        {!loadingUnits ? (
          <>
            <motion.section initial={{opacity: 0}} whileInView={{opacity: 1, transition: {delay: 0, duration: 0.4}}} viewport={{ once: true, amount: 0 }} className="w-full flex flex-col justify-center items-start md:gap-3 gap-1">
              <h2 className="md:text-sm text-xs font-[900] text-[#9399a2] uppercase">Temperature</h2>
              <div className="w-full h-auto p-1 bg-[#a4aab3] md:text-base text-sm flex justify-between items-center rounded-2xl">
                <button onClick={() => handleUnitChange("temperature", "Celsius")} className={`${units.temperature === 'Celsius' ? 'bg-[#dde0e4] dark:bg-[#303134] font-[900]' : 'font-normal'} w-full duration-200 p-2 rounded-2xl`}>Celsius</button>
                <button onClick={() => handleUnitChange("temperature", "Fahrenheit")} className={`${units.temperature === 'Fahrenheit' ? 'bg-[#dde0e4] dark:bg-[#303134] font-[900]' : 'font-normal'} w-full duration-200 p-2 rounded-2xl`}>Fahrenheit</button>
              </div>
            </motion.section>
            <motion.section initial={{opacity: 0}} whileInView={{opacity: 1, transition: {delay: 0.2, duration: 0.4}}} viewport={{ once: true, amount: 0 }} className="w-full flex flex-col justify-center items-start md:gap-3 gap-1">
              <h2 className="md:text-sm text-xs font-[900] text-[#9399a2] uppercase">Wind speed</h2>
              <div className="w-full h-auto p-1 bg-[#a4aab3] md:text-base text-sm flex justify-between items-center rounded-2xl">
                <button onClick={() => handleUnitChange("windSpeed", "km/h")} className={`${units.windSpeed === 'km/h' ? 'bg-[#dde0e4] dark:bg-[#303134] font-[900]' : 'font-normal'} w-full duration-200 p-2 rounded-2xl`}>km/h</button>
                <button onClick={() => handleUnitChange("windSpeed", "m/s")} className={`${units.windSpeed === 'm/s' ? 'bg-[#dde0e4] dark:bg-[#303134] font-[900]' : 'font-normal'} w-full duration-200 p-2 rounded-2xl`}>m/s</button>
                <button onClick={() => handleUnitChange("windSpeed", "Knots")} className={`${units.windSpeed === 'Knots' ? 'bg-[#dde0e4] dark:bg-[#303134] font-[900]' : 'font-normal'} w-full duration-200 p-2 rounded-2xl`}>Knots</button>
              </div>
            </motion.section>
            <motion.section initial={{opacity: 0}} whileInView={{opacity: 1, transition: {delay: 0.3, duration: 0.4}}} viewport={{ once: true, amount: 0 }} className="w-full flex flex-col justify-center items-start md:gap-3 gap-1">
              <h2 className="md:text-sm text-xs font-[900] text-[#9399a2] uppercase">Pressure</h2>
              <div className="w-full h-auto p-1 bg-[#a4aab3] md:text-base text-sm flex justify-between items-center rounded-2xl">
                <button onClick={() => handleUnitChange("pressure", "hPa")} className={`${units.pressure === 'hPa' ? 'bg-[#dde0e4] dark:bg-[#303134] font-[900]' : 'font-normal'} w-full duration-200 p-2 rounded-2xl`}>hPa</button>
                <button onClick={() => handleUnitChange("pressure", "kPa")} className={`${units.pressure === 'kPa' ? 'bg-[#dde0e4] dark:bg-[#303134] font-[900]' : 'font-normal'} w-full duration-200 p-2 rounded-2xl`}>kPa</button>
                <button onClick={() => handleUnitChange("pressure", "mm")} className={`${units.pressure === 'mm' ? 'bg-[#dde0e4] dark:bg-[#303134] font-[900]' : 'font-normal'} w-full duration-200 p-2 rounded-2xl`}>mm</button>
              </div>
            </motion.section>
            <motion.section initial={{opacity: 0}} whileInView={{opacity: 1, transition: {delay: 0.4, duration: 0.4}}} viewport={{ once: true, amount: 0 }} className="w-full flex flex-col justify-center items-start md:gap-3 gap-1">
              <h2 className="md:text-sm text-xs font-[900] text-[#9399a2] uppercase">Distance</h2>
              <div className="w-full h-auto p-1 bg-[#a4aab3] md:text-base text-sm flex justify-between items-center rounded-2xl">
                <button onClick={() => handleUnitChange("distance", "Kilometers")} className={`${units.distance === 'Kilometers' ? 'bg-[#dde0e4] dark:bg-[#303134] font-[900]' : 'font-normal'} w-full duration-200 p-2 rounded-2xl`}>Kilometers</button>
                <button onClick={() => handleUnitChange("distance", "Miles")} className={`${units.distance === 'Miles' ? 'bg-[#dde0e4] dark:bg-[#303134] font-[900]' : 'font-normal'} w-full duration-200 p-2 rounded-2xl`}>Miles</button>
              </div>
            </motion.section>
            <motion.section initial={{opacity: 0}} whileInView={{opacity: 1, transition: {delay: 0.5, duration: 0.4}}} viewport={{ once: true, amount: 0 }} className="w-full flex flex-col justify-center items-start md:gap-3 gap-1">
              <h2 className="md:text-sm text-xs font-[900] text-[#9399a2] uppercase">Time Format</h2>
              <div className="w-full h-auto p-1 bg-[#a4aab3] md:text-base text-sm flex justify-between items-center rounded-2xl">
                <button onClick={() => handleUnitChange("timeFormat", "12-Hour")} className={`${units.timeFormat === '12-Hour' ? 'bg-[#dde0e4] dark:bg-[#303134] font-[900]' : 'font-normal'} w-full duration-200 p-2 rounded-2xl`}>12-Hour</button>
                <button onClick={() => handleUnitChange("timeFormat", "24-Hour")} className={`${units.timeFormat === '24-Hour' ? 'bg-[#dde0e4] dark:bg-[#303134] font-[900]' : 'font-normal'} w-full duration-200 p-2 rounded-2xl`}>24-Hour</button>
              </div>
            </motion.section>
            <motion.section initial={{opacity: 0}} whileInView={{opacity: 1, transition: {delay: 0.6, duration: 0.4}}} viewport={{ once: true, amount: 0 }} className="w-full flex flex-col justify-center items-start md:gap-3 gap-1">
              <h2 className="w-auto lg:min-w-[40%] sm:min-w-[80%] min-w-full md:text-start text-center text-2xl font-[700] pl-2 md:mt-6 mt-4">General</h2>
              <div className="w-full h-auto p-1 bg-[#a4aab3] md:text-base text-sm flex justify-between items-center rounded-2xl sm:px-10 px-4 md:mt-0 mt-4">
                <p className="py-2">Dark Mode</p>
                <ThemeSwitch/>
              </div>
            </motion.section>
          </>
        ) : (
          <>
            {[...Array(6).keys()].map((i) => (
              <div key={i} className="w-full flex flex-col justify-center items-start md:gap-3 gap-1">
                <div className="bg-gray-300 dark:bg-[#525356] animate-pulse w-[110px] h-[20px] rounded-2xl"></div>
                <div className="w-full h-[48px] bg-gray-300 dark:bg-[#525356] animate-pulse rounded-2xl"></div>
              </div>
            ))}
          </>
        )}
      </section>
      <section ref={modalRef} className="relative md:w-2/5 w-full h-full bg-[#eaecef] dark:bg-[#303134] rounded-2xl md:p-5 p-5 md:gap-5 gap-3 md:overflow-y-scroll overflow-visible flex flex-col justify-between items-center">
        <span className="absolute md:flex hidden justify-center items-center drop-shadow-lg bg-[#0095ff] text-[#fff] left-0 top-3 py-1 -rotate-45 z-[10] w-[120px] -translate-x-7">Sale</span>
        <motion.section initial={cardVariants.offscreen} whileInView={cardVariants.onscreen} viewport={{ once: true, amount: 0.5 }} className="w-full max-h-[400px] rounded-2xl">
          <Image src={OfferImage} className="w-full h-full rounded-2xl" loading="eager" alt="Offer Image" title="Offer Image"/>
        </motion.section>
        <section className="w-full md:text-start text-center h-auto">
          <h2 className="md:text-3xl text-2xl font-[700]">Get new experience!</h2>
          {!loadingUnits ? (
            <ul className="list-disc text-start md:p-5 py-3 px-5 border-b dark:border-b-[#414143] md:text-base text-sm text-[#9399a2] border-[#9399a2]">
              <motion.li initial={{opacity: 0}} whileInView={{opacity: 1, transition: {delay: 0, duration: 0.4}}} viewport={{ once: true, amount: 0 }}>Ad free</motion.li>
              <motion.li initial={{opacity: 0}} whileInView={{opacity: 1, transition: {delay: 0.2, duration: 0.4}}} viewport={{ once: true, amount: 0 }}>Health activities overview</motion.li>
              <motion.li initial={{opacity: 0}} whileInView={{opacity: 1, transition: {delay: 0.4, duration: 0.4}}} viewport={{ once: true, amount: 0 }}>Weather notifications</motion.li>
              <motion.li initial={{opacity: 0}} whileInView={{opacity: 1, transition: {delay: 0.6, duration: 0.4}}} viewport={{ once: true, amount: 0 }}>New features</motion.li>
              <motion.li initial={{opacity: 0}} whileInView={{opacity: 1, transition: {delay: 0.8, duration: 0.4}}} viewport={{ once: true, amount: 0 }}>And many more!</motion.li>
            </ul>
          ) : (
            <div className="md:py-5 py-3 border-b flex flex-col gap-1 md:text-base text-sm text-[#9399a2] border-[#9399a2]">
              {[...Array(5).keys()].map((i) => (
                <div key={i} className="w-[200px] md:h-[20px] h-[16px] bg-gray-300 dark:bg-[#525356] animate-pulse rounded-2xl"></div>
              ))}
            </div>
          )}
          <p className="pt-2 text-[#9399a2] md:text-base text-sm">Sign up for our daily newsletter personalized just for you.</p>
        </section>
        <section className="w-full h-auto flex flex-col md:gap-3 gap-2">
          {!loadingUnits ? (
            <div className="bg-[#c6ccd5] w-full h-auto md:p-3 p-2 rounded-2xl text-center">
              <p className="md:text-xl dark:text-[#202b3b] text-lg font-[900]">$5.99<span className="md:text-sm text-xs font-[700]">/month</span></p>
            </div>
          ) : (
            <div className="w-full md:h-[52px] h-[44px] rounded-2xl bg-gray-300 dark:bg-[#525356] animate-pulse"></div>
          )}
          <button className="w-full text-center md:!p-3 !p-2 bn632-hover bn26 md:text-lg text-base">Subscribe</button>
        </section>
      </section>
    </main>
  )
}
