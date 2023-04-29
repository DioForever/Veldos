import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import Button from 'react-bootstrap/Button';
import search_logo from './assets/Search.png';
import profile_logo from './assets/profilepicture.png';
import video from './assets/log-horizon-episode-11681519621.0.mp4';
import "./App.css";



function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

function getTitle(){
}
function getUrl(){
}

  return (
      <body>
        <div className="navbar">
          <div className="menu">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="search">
            <form action="" className="search-bar">
              <input type="search" name="q" id="" placeholder="Search..." />
              <Button ><img src={search_logo}/></Button>
            </form>
          </div>
          <div className="pfp"><img src={profile_logo} alt="" /></div>
        </div>
        <div>
        <div className="video">
          <h1>Log Horizon</h1>
          <iframe id="iframe-embed" src="//playtaku.net/streaming.php?id=Nzc=&title=Log+Horizon+Episode+1" allow="autoplay; fullscreen" allowFullScreen></iframe>
        </div>
        <div className="episodes">
          
        </div>
        <p>url: {name}</p>
        
        </div>
      </body>
  );
}

export default App;
