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



function App() {


  return (
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Search/>}></Route>
          </Routes>
        </Router>

      {/* <div className="navbar">
          <div className="menu">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="search">
            <form action="" className="search-bar" onSubmit={search}>
              <input onChange={(e) => setName(e.target.value)} type="search" name="q" id="searchInput" autoComplete="off" placeholder="Search..." />
              <Button><img src={search_logo}/></Button>
            </form>
          </div>
          <div className="pfp"><img src={profile_logo} alt="" /></div>
        </div>

        <div id="stream">
          <div className="video">
            <h1>Log Horizon</h1>
            <iframe id="iframe-embed" src="//playtaku.net/streaming.php?id=Nzc=&title=Log+Horizon+Episode+1" scrolling="no" allow="autoplay; fullscreen; webkitallowfullscreen;mozallowfullscreen; "></iframe>
          </div>
          <div className="episodes">
            
          </div>
          <p>search: {name}</p>
        
        </div>
         */}
      </div>
  );
}

export default App;
