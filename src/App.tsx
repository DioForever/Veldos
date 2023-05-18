import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Home } from "./components/Home";
import { Search } from "./components/Search";
import { AnimeInfo } from "./components/AnimeInfo";


export type AnimeSearch = {
  title: string;
  url: string;
  image_url: string;
  episodes: string;
  time: string;
}
// const [title, pageurl, imageurl, episode_count, date]
export type AnimeInfo = {
  title: string;
  pageurl: string;
  imageurl: string;
  episode_count: string;
  date: string;
}


function App() {
  const [searchResponse, setSearchResponse] = useState<AnimeSearch[]>([]);
  const [animeInfo, setAnimeInfo] = useState<AnimeSearch[]>([]);

  return (
    <div className="base">
      <Navbar searchResponse={searchResponse} setSearchResponse={setSearchResponse} />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/search" element={<Search searchResponse={searchResponse}/>}/>
          <Route path="/animeinfo" element={<AnimeInfo/>}/>
        </Routes>

    </div>


  
  );
}

export default App;
