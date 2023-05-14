import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import Button from 'react-bootstrap/Button';
import search_logo from './assets/Search.png';
import profile_logo from './assets/profilepicture.png';
import video from './assets/log-horizon-episode-11681519621.0.mp4';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "./pages/SearchPage";
import InfoPage from "./pages/InfoPage";
import { Anime, AnimeInfo } from "./components/searchResult";



function App() {
  const [searchResult, setSearchResult] = useState<Anime[]>([]);
  const [infoAnime, setinfoAnime] = useState<AnimeInfo>({} as AnimeInfo);

  return (
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Search 
             searchResult={searchResult}
             setSearchResult={setSearchResult}
             setinfoAnime={setinfoAnime}
             infoAnime={infoAnime}/>}></Route>
            <Route path="/info" element={<InfoPage 
            setSearchResult={setSearchResult}
            infoAnime={infoAnime}/>}></Route>
          </Routes>
        </Router>

      {}
      </div>
  );
}

export default App;
