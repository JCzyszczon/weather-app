"use client";
import React, { useState } from "react";
import {BiSearchAlt} from 'react-icons/bi';
import { useRouter } from 'next/navigation'

export default function SearchBar() {
    const router = useRouter()
    const [userInput, setUserInput] = useState('');

    const formSubmitHandler = (event) => {
        event.preventDefault();
        router.push(`/search/${userInput}`);
    }

    return (
        <>
        <form onSubmit={formSubmitHandler} className="md:w-3/5 w-full bg-[#eaecef] dark:bg-[#303134] rounded-2xl sm:overflow-hidden overflow-visible">
            <section className="relative">
                <button type="submit" className="absolute top-0 bottom-0 my-auto text-gray-400 left-3">
                    <BiSearchAlt className='w-6 h-6 hover:text-[#0095ff] duration-300'/>
                </button>
                <input type="search" name='search' placeholder="Search City" className="w-full py-3 pl-12 rounded-2xl pr-4 duration-300 text-gray-500 outline-none bg-[#eaecef] dark:bg-[#303134] borderColor" onChange={(event) => {setUserInput(event.target.value)}}/>
            </section>
        </form>
        <section className='w-2/5 md:flex hidden justify-center items-center'></section>
        </>
    )
}