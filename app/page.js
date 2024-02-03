import MainPanel from "./components/mainPanel";
import React from "react";
import SearchBar from "./components/searchBar";

export default function Home() {
  return (
    <main className="w-full flex flex-col gap-2">
      <SearchBar/>
      <MainPanel/>
    </main>
  )
}
