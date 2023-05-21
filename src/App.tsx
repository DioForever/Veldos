import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Home } from "./pages/Home";
import { Search } from "./pages/Search";
import AnimeInfoPage from "./pages/AnimeInfoPage";
import { WatchEpisode } from "./pages/WatchEpisode";


export type AnimeSearch = {
  title: string;
  url: string;
  image_url: string;
  episodes: string;
  time: string;
}
// const [title, pageurl, imageurl, episode_count, date]
// return vec![(title, url ,img, episode_count, release_date, genres, description, episodes)];
export type AnimeInfo = {
  title: string;
  pageurl: string;
  imageurl: string;
  episode_count: string;
  date: string;
  genres: string;
  description: string;
  episodes: any;
}


function App() {
  const [searchResponse, setSearchResponse] = useState<AnimeSearch[]>([]);
  const [getAnimeInfo, setAnimeInfo] = useState<AnimeInfo>({} as AnimeInfo);

  return (
    <div className="base">
      <Navbar searchResponse={searchResponse} setSearchResponse={setSearchResponse} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search searchResponse={searchResponse} setAnimeInfo={setAnimeInfo} />} />
        <Route path="/animeinfo" element={<AnimeInfoPage getAnimeInfo={getAnimeInfo} />} />
        <Route path="/watchEpisode" element={<WatchEpisode />} />
      </Routes>

    </div>



  );
}

export default App;
