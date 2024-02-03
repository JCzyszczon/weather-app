import React from "react";
import NotFound404 from "../components/notFound";

export const metadata = {
  title: '404 - WeatherApp',
}

export default function Home() {
  return (
    <main className="w-full flex flex-col gap-2">
      <NotFound404/>
    </main>
  )
}