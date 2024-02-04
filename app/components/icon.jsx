"use client";
import React from 'react';
import Image from 'next/image';

import Clear from '../img/sun/26.png';
import Clear2 from '../img/moon/9.png';
import Clouds from '../img/sun/27.png';
import Clouds2 from '../img/moon/15.png';
import Tornado from '../img/cloud/35.png';
import Mist from '../img/cloud/35.png';
import Smoke from '../img/cloud/35.png';
import Haze from '../img/cloud/35.png';
import Dust from '../img/cloud/35.png';
import Fog from '../img/sun/26.png';
import Sand from '../img/sun/26.png';
import Ash from '../img/sun/26.png';
import Squall from '../img/sun/26.png';
import Snow from '../img/cloud/18.png';
import Rain from '../img/sun/8.png';
import Rain2 from '../img/moon/1.png';
import Drizzle from '../img/cloud/7.png';
import Thunderstorm from '../img/cloud/12.png';
import Thunderstorm2 from '../img/moon/20.png';
import Search from '../img/sun/16.png';
import Search2 from '../img/sun/16.png';
import Humidity from '../img/rain/39.png';
import Wind from '../img/sun/4.png';
import Wind2 from '../img/moon/2.2.png';
import Pressure from '../img/sun/6.png';
import Pressure2 from '../img/moon/41.png';

const iconsDay = {
    Clear: Clear,
    Clouds: Clouds,
    Tornado: Tornado,
    Mist: Mist,
    Smoke: Smoke,
    Haze: Haze,
    Dust: Dust,
    Fog: Fog,
    Sand: Sand,
    Ash: Ash,
    Squall: Squall,
    Snow: Snow,
    Rain: Rain,
    Drizzle: Drizzle,
    Thunderstorm: Thunderstorm,
    Search: Search,
    Humidity: Humidity,
    Wind: Wind,
    Pressure: Pressure,
};

const iconsNight = {
    Thunderstorm: Thunderstorm2,
    Drizzle: Drizzle,
    Rain: Rain2,
    Snow: Snow,
    Tornado: Tornado,
    Mist: Mist,
    Smoke: Smoke,
    Haze: Haze,
    Dust: Dust,
    Fog: Fog,
    Sand: Sand,
    Ash: Ash,
    Squall: Squall,
    Clouds: Clouds2,
    Clear: Clear2,
    Search: Search2,
    Humidity: Humidity,
    Wind: Wind2,
    Pressure: Pressure2,
}

function Icon({ name, timezone, dt_txt, ...props }) {
    const timezoneOffset = timezone || 0;
    const timestamp = Date.parse(dt_txt);
    const localTimestamp = timestamp + timezoneOffset * 1000;
    const localDate = new Date(localTimestamp);
    const hours = localDate.getHours();

    const isDaytime = hours >= 6 && hours < 20;
    const iconSet = isDaytime ? iconsDay : iconsNight;
    const icon = iconSet[name];
  
    if (!icon) {
        return <Image src={Clear} alt='Basic Icon' {...props} loading='eager' title='Basic Icon'/>;
    } else {
        return <Image src={icon} alt={name} {...props} loading='eager' title={name}/>;
    }
}
  
export default Icon;