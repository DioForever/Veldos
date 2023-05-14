import { invoke } from "@tauri-apps/api/tauri";
import { ReactElement, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { env } from "process";
import search_logo from '../assets/Search.png';
import profile_logo from '../assets/profilepicture.png';
import ResultList from "../components/searchResult";
import { type Anime } from "../components/searchResult";
import {search} from "../components/searchResult";

import "./SearchPage.css";


function Search({searchResult, setSearchResult, setinfoAnime, infoAnime}: any) {

  const [name, setName] = useState("");
  function handleKeyDown(event: any) {
    event.preventDefault();
    if (event.key === "Enter") {
      getSearched(name);
    }
  }


  function getSearched(name: string) {
    // deconstruct the array to array of Anime objects
    setSearchResult([]);
    search(name).then((res: any[]) => {
      const searchResultList: Anime[] = res.map((anime) => {
        const [title, pageurl, imageurl, episode_count, date] = anime;
        return { title, pageurl, imageurl, episode_count, date };
      }); 
      setSearchResult(searchResultList);
    });
  }
  

  

  return (
      <div>
        <div className="navbar">
          <div className="menu">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="search">
            <form action="" className="search-bar" onSubmit={(e) => {getSearched(name); handleKeyDown(e);}}>
              <input onChange={(e) => setName(e.target.value)} type="search" name="q" id="searchInput" autoComplete="off" placeholder="Search..." />
              <Button onMouseDown={() => getSearched(name)}><img src={search_logo}/></Button>
            </form>
          </div>
          <div className="pfp"><img src={profile_logo} alt="" /></div>
        </div>
        <div className="results">
          <ResultList  searchResult={searchResult} setinfoAnime={setinfoAnime} />
        </div>
      </div>
  );
}

export default Search;
