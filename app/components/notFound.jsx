import Link from 'next/link';
import React from "react";

export default function NotFound404() {

    return (
      <section className='w-full h-full min-h-[70vh] flex justify-center items-center md:flex-row flex-col lg:gap-6 gap-2 md:overflow-hidden overflow-visible mainPanel'>
        <section className='w-auto h-full flex flex-col justify-center items-center gap-5 text-center'>
            <h2 className='textStyle sm:text-[200px] text-[100px] font-[900]'>404</h2>
            <h1 className='sm:text-4xl text-3xl font-[700] tracking-wider'>Page Not Found</h1>
            <p className='text-[#9399a2] sm:text-base text-sm'>The page you&apos;re looking for does not seem to exist</p>
            <Link href={'/'}><button className='bg-[#0095ff] text-[#f5f5f5] px-8 py-2 rounded-2xl hover:bg-[#202b3b] duration-300 drop-shadow-2xl hover:scale-95'>Go to Home</button></Link>
        </section>
      </section> 
    )
}