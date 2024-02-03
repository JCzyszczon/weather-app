import React from "react";
import FavouritePanel from "../components/favouritePanel";

export const metadata = {
  title: 'Favourite - WeatherApp',
  alternates: {
    canonical: 'https://www.jczyszczon.pl/favourite',
  },
}

export default function Home() {
  return (
    <FavouritePanel/>
  )
}
