"use client";
import React, { useState, useEffect } from "react";
import { FaCircleInfo } from 'react-icons/fa6';
import { MdDragIndicator, MdEdit, MdClose, MdDelete } from 'react-icons/md'
import { getWeatherData } from '../api/openWeather';
import IconComp from "./iconComp";
import { format } from 'date-fns';
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Droppable, Draggable, DragDropContext } from '@hello-pangea/dnd';
import { BsFillQuestionCircleFill } from "react-icons/bs";
import DeleteModal from "./deleteModal";
import WeatherModal from "./weatherModal";
import DetailsComponent from "./detailsComponent";

export default function FavouritePanel() {

    const [favObject, setFavObj] = useState();
    const [weatherData, setWeatherData] = useState([]);
    const [loadingData, setLoadingData] = useState(true);
    const [units, setUnits] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [indexCity, setIndexCity] = useState();
    const [nameCity, setNameCity] = useState();
    const [selectedCity, setSelectedCity] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isWeatherModalOpen, setIsWeatherModalOpen] = useState(false);
    const [weatherSendingData, setWeatherSendingData] = useState();

    useEffect(() => {
        setLoadingData(true);
        const favObj = getFavoritesFromLocalStorage();
    
        const fetchWeatherData = async () => {
            try {
                setWeatherData([]);
                let newData = [];
                for (let i = 0; i < favObj.length; i++) {
                    let data = await getWeatherData(favObj[i]);
                    newData.push(data);
                }
                setWeatherData(prevData => [...prevData, ...newData]);
            } catch (error) {
                console.log(error);
            }
        };
    
        if(favObj.length > 0) {
            setFavObj(favObj);
            fetchWeatherData();
            setSelectedCity(0);
        }
        setLoadingData(false);
    }, []);

    useEffect(() => {
        const savedUnits = localStorage.getItem("units");
        if (savedUnits) {
          const units = JSON.parse(savedUnits);
          setUnits(units);
        }
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
  
    const getFavoritesFromLocalStorage = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        return [...new Set(favorites)];
    };

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

    const handleDragEnd = (result) => {
        if (!result.destination || !isEditing) return;
    
        const newWeatherData = [...weatherData];
        const [movedItem] = newWeatherData.splice(result.source.index, 1);
        newWeatherData.splice(result.destination.index, 0, movedItem);
    
        setWeatherData(newWeatherData);
        setSelectedCity(result.destination.index);

        const newFavObj = [...favObject];
        newFavObj.splice(result.source.index, 1);
        newFavObj.splice(result.destination.index, 0, favObject[result.source.index]);
        setFavObj(newFavObj);
        localStorage.setItem('favorites', JSON.stringify(newFavObj));
    };

    const handleDelete = (index) => {
        const newWeatherData = [...weatherData];
        const deletedCity = newWeatherData.splice(index, 1)[0];
        setWeatherData(newWeatherData);
    
        const newFavObj = [...favObject];
        const deletedFavorite = newFavObj.splice(index, 1)[0];
        setFavObj(newFavObj);
    
        const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
        const updatedFavorites = favoritesFromLocalStorage.filter(favorite => favorite !== deletedFavorite);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

        if (newFavObj.length === 0) {
            setFavObj(null);
            setSelectedCity(null);
        } else {
            setSelectedCity(index - 1);
        }
        setIsModalOpen(false);
    };

    useEffect(() => {
        function handleResize() {
          if (window.innerWidth < 768) {
              setIsMobile(true);
          } else {
              setIsMobile(false);
          }
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const deleteFavCity = (id, name) => {
        setIndexCity(id);
        setNameCity(name);
        setIsModalOpen(true);
    }

    const handleSelection = (index, data) => {
        if(isMobile) {
            setSelectedCity(index)
            setWeatherSendingData(data);
            setIsWeatherModalOpen(true);
        } else {
            setSelectedCity(index)
            setIsWeatherModalOpen(false);
        }
    }

    return (
        <>
        <section className='w-full h-full flex md:flex-row flex-col lg:gap-6 gap-2 md:overflow-hidden overflow-visible mainPanel'>
            <section className='md:w-3/5 w-full h-full flex flex-col justify-start items-start md:gap-6 gap-2 md:overflow-y-scroll overflow-visible rounded-2xl'>
                <section className="w-full flex justify-between items-center md:pt-2 pt-5 px-5">
                    <div className="flex justify-between items-end gap-3">
                        <h1 className="lg:text-2xl md:text-xl text-lg font-[900] uppercase">Favourites</h1>
                        <p className="font-[900] text-[#9399a2] lg:text-base text-sm">{favObject ? favObject.length + '/5' : '0/5'}</p>
                    </div>
                    {favObject && <button onClick={() => setIsEditing(!isEditing)}>{isEditing ? <MdClose className="text-2xl duration-300"/> : <MdEdit className="text-2xl duration-300"/>}</button>}
                </section>
            {!loadingData ? (
                <>
                {favObject ? (
                    <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
                        <Droppable droppableId="weather-tiles" direction="vertical">
                        {(provided) => (
                            <section ref={provided.innerRef} {...provided.droppableProps} className="w-full flex flex-col lg:gap-6 gap-2">
                                {weatherData.map((data, index) => (
                                    <Draggable key={index} draggableId={`weather-tile-${index}`} isDragDisabled={!isEditing} index={index}>
                                        {(provided) => (
                                            <motion.section onClick={() => handleSelection(index, data)} initial={{opacity: 0}} whileInView={{opacity: 1, transition: {delay: index/7, duration: 0.4}}} viewport={{ once: true, amount: 0 }} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={`${selectedCity === index && !isMobile ? 'border border-[#ddd] dark:border-[#555] shadow-md dark:shadow-xl' : 'border border-transparent'} ${isMobile && 'hover:border hover:border-[#ddd] hover:dark:border-[#555] hover:shadow-md hover:dark:shadow-xl'} duration-300 cursor-pointer relative w-full bg-[#eaecef] dark:bg-[#303134] group rounded-2xl md:px-10 px-5 md:py-4 py-2 lg:gap-10 gap-5 flex justify-between items-center overflow-hidden`}>
                                                {isEditing && (
                                                    <span className="md:w-[20px] w-[15px] bg-[#c8cacd] dark:bg-[#525356] dark:group-hover:bg-[#414245] group-hover:bg-[#b7b8bc] duration-300 h-full flex justify-center items-center absolute left-0 top-0">
                                                        <MdDragIndicator/>
                                                    </span>
                                                )}
                                                <IconComp name={data.list[0].weather[0].main} timezone={data.city.timezone} dt_txt={data.list[0].dt_txt} className='w-auto lg:max-h-[60px] max-h-[50px] aspect-square object-contain'/>
                                                <section className="w-full flex flex-col justify-between items-start gap-2">
                                                    <h2 className="md:text-2xl text-xl font-[900]">{data.city.name}</h2>
                                                    <p className="md:text-base text-sm text-[#9399a2]">{formatLocalDate(data.list[0].dt_txt, data.city.timezone, false)}</p>
                                                </section>
                                                <section className="w-auto flex justify-center items-center">
                                                    {isEditing ? (
                                                        <MdDelete onClick={() => deleteFavCity(index, data.city.name)} className="text-3xl hover:text-[#000919] dark:hover:text-[#b0b9cc] duration-300"/>
                                                    ) : (
                                                        <p className="text-2xl text-[#9399a2] font-[700]">{calculateTemp(data.list[0].main.temp, false)}°</p>
                                                    )}
                                                </section>
                                            </motion.section>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </section>
                        )}
                        </Droppable>
                    </DragDropContext>
                ) : (
                    <section className='w-full h-full md:min-h-0 min-h-[70vh] md:p-5 px-1 py-6 justify-center items-center flex flex-col text-[#9399a2] gap-4'>
                        <FaCircleInfo className='text-3xl'/>
                        <h1 className="md:text-base text-sm text-center">You haven&apos;t added any cities to your list yet.<br/> To do this, you can click the heart icon in the main panel.</h1>
                        <Link href={"/"} className="bn632-hover bn26 !px-10 !py-2 !text-sm">Search now</Link>
                    </section>
                )}
                </>
            ) : (
                <section className="w-full flex flex-col lg:gap-6 gap-2">
                  {[...Array(5).keys()].map((i) => (
                    <div key={i} className="w-full h-[96px] bg-gray-300 dark:bg-[#525356] animate-pulse rounded-2xl"></div>
                  ))}
                </section>
            )}
            </section>
            {!loadingData ? (
                <section className={`md:w-2/5 w-full h-full bg-[#eaecef] dark:bg-[#303134] rounded-2xl gap-4 md:flex hidden flex-col ${!favObject ? 'justify-center items-center' : 'justify-start items-start'} xl:p-8 p-4 md:overflow-y-scroll overflow-visible`}>
                    {selectedCity == null && !favObject ? (
                        <>
                            <BsFillQuestionCircleFill className='text-3xl'/>
                            <p>Please select city to display data<br/>or add new to your favourites list.</p>
                        </>
                    ) : (
                        <>
                        {weatherData[0] && (
                            <DetailsComponent data={weatherData[selectedCity]} units={units}/>
                        )}
                        </>
                    )}
                </section>
            ) : (
                <section className="md:w-2/5 w-full h-full rounded-2xl bg-gray-300 dark:bg-[#525356] animate-pulse"></section>
            )}
        </section>
        <AnimatePresence initial={false} mode='wait' onExitComplete={() => null}>
        {isModalOpen &&
          <DeleteModal closeModal={() => setIsModalOpen(false)} cityName={nameCity} cityIndex={indexCity} deleteCity={(index) => handleDelete(index)}/>
        }
        </AnimatePresence>
        <AnimatePresence initial={false} mode='wait' onExitComplete={() => null}>
        {isWeatherModalOpen &&
            <WeatherModal closeModal={() => setIsWeatherModalOpen(false)} data={weatherSendingData} units={units}/>
        }
        </AnimatePresence>
        </>
    );
}