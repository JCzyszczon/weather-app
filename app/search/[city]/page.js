import MainPanel from "../../components/mainPanel";
import React from "react";
import SearchBar from "../../components/searchBar";

export async function generateMetadata({ params }) {
  const decodedCityName = params.city ? decodeURIComponent(params.city) : '';

  return {
    title: `${decodedCityName} - WeatherApp`
  }
}

export default function Home({ params }) {
  return (
    <main className="w-full flex flex-col gap-2">
        <SearchBar/>
        <MainPanel city={params.city}/>
    </main>
  )
}