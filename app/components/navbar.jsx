"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React, { useState, useEffect } from "react";
import {BsFillCloudSunFill, BsHeartFill, BsFillQuestionCircleFill} from 'react-icons/bs';
import { VscSettings } from 'react-icons/vsc';
import { AnimatePresence } from "framer-motion";
import InfoModal from './infoModal';

export default function Navbar() {

    const pathname = usePathname()
    const [currentPath, setCurrentPath] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setCurrentPath(pathname);
    }, [pathname]);

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

    return (
        <>
        <header className={`sm:w-[90px] w-full sm:h-full overflow-y-scroll no-scrollbar h-auto bg-[#eaecef] dark:bg-[#303134] z-50 rounded-2xl flex sm:flex-col flex-row justify-between items-center sm:py-10 py-3 px-3 ${currentPath ? '' : 'animate-pulse'}`}>
            <div className='sm:w-full w-auto h-auto flex flex-col justify-center items-center gap-1'>
                <a href='/' aria-label="Go to main page" className='text-[#0095ff] sm:text-3xl text-2xl font-[700] font-Kalam hover:animate-bounce2 sm:py-5 py-0'>W.</a>
            </div>
            <nav className='w-full flex sm:flex-col flex-row sm:justify-center justify-end items-center sm:gap-10 gap-8'>
                <Link href={'/'} aria-label="Go to main page"><div onClick={() => setCurrentPath('/')} className={`w-full h-auto flex flex-col justify-center duration-200 items-center ${currentPath === '/' || currentPath.startsWith('/search') ? 'font-[900] hover:text-[##202b3b] text-[##202b3b] gap-2' : 'font-normal hover:text-[#0095ff] text-[#9399a2] gap-1'}`}>
                    <BsFillCloudSunFill className='sm:text-3xl text-2xl'/>
                    <p className='text-sm sm:flex hidden'>Weather</p>
                </div></Link>
                <Link href={'/favourite'} aria-label="Go to cities page"><div onClick={() => setCurrentPath('/favourite')} className={`w-full h-auto flex flex-col justify-center duration-200 items-center gap-1 ${currentPath === '/favourite' ? 'font-[900] hover:text-[##202b3b] text-[##202b3b] gap-2' : 'font-normal hover:text-[#0095ff] text-[#9399a2] gap-1'}`}>
                    <BsHeartFill className='sm:text-2xl text-xl'/>
                    <p className='text-sm sm:flex hidden'>Cities</p>
                </div></Link>
                <Link href={'/settings'} aria-label="Go to settings page"><div onClick={() => setCurrentPath('/settings')} className={`w-full h-auto flex flex-col justify-center duration-200 items-center gap-1 ${currentPath === '/settings' ? 'font-[900] hover:text-[##202b3b] text-[##202b3b] gap-2' : 'font-normal hover:text-[#0095ff] text-[#9399a2] gap-1'}`}>
                    <VscSettings className='sm:text-2xl text-xl'/>
                    <p className='text-sm sm:flex hidden'>Settings</p>
                </div></Link>
            </nav>
            <div onClick={() => setIsModalOpen(true)} className='w-full cursor-pointer h-auto sm:flex hidden flex-col justify-center items-center gap-1 pt-10'>
                <BsFillQuestionCircleFill className='sm:text-3xl text-xl text-[#9399a2] hover:text-[#202b3b] dark:hover:text-[#e0ecff] duration-200'/>
            </div>
        </header>
        <AnimatePresence initial={false} mode='wait' onExitComplete={() => null}>
        {isModalOpen &&
          <InfoModal closeModal={() => setIsModalOpen(false)}/>
        }
        </AnimatePresence>
        </>
    )
}