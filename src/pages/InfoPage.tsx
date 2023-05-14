import { invoke } from "@tauri-apps/api/tauri";
import { ReactElement, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import search_logo from '../assets/Search.png';
import profile_logo from '../assets/profilepicture.png';
import ResultList from "../components/searchResult";
import { type AnimeInfo, type Anime } from "../components/searchResult";
import {search} from "../components/searchResult";
import {Routes, Route, useNavigate} from 'react-router-dom';
import "./InfoPage.css";


type ResultListProps = {
    setSearchResult: React.Dispatch<React.SetStateAction<Anime[]>>;
    infoAnime: AnimeInfo;
};

function Search({setSearchResult, infoAnime}: ResultListProps) {
  const [name, setName] = useState("");
  const navigate = useNavigate();


  
    const navigateToSearch = (name: string) => {
        // deconstruct the array to array of Anime objects
        console.log("infoanime", infoAnime);
        setSearchResult([]);
        search(name).then((res: any[]) => {
            const searchResultList: Anime[] = res.map((anime) => {
                const [title, pageurl, imageurl, episode_count, date] = anime;
                return { title, pageurl, imageurl, episode_count, date };
            });
            setSearchResult(searchResultList);
        });
        navigate('/');
    };

  

    return (
        <div>
            <div className="navbar">
                <div className="menu">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className="search">
                    <form action="" className="search-bar" onSubmit={() => navigateToSearch(name)}>
                        <input onChange={(e) => setName(e.target.value)} type="search" name="q" id="searchInput" autoComplete="off" placeholder="Search..." />
                        <Button onMouseDown={() => navigateToSearch(name)}><img src={search_logo} /></Button>
                    </form>
                </div>
                <div className="pfp"><img src={profile_logo} alt="" /></div>
            </div>

            <div className="info">
                <div className="description">
                    <img src={infoAnime.imageurl} alt="" />
                    <div>
                        <h1>{infoAnime.title}</h1>
                        <h2>Episodes: {infoAnime.episode_count}/{infoAnime.episode_total}</h2>
                        <h2>Genres: {infoAnime.genres}</h2>
                        <h2>Release date: {infoAnime.date}</h2>
                        <h3>{infoAnime.description}</h3>
                    </div>
                </div>
            </div>
            <div className="watch">
                <h1>Continue watching at Episode 2046{}</h1>
            </div>
            <div className="episodes">
                    {infoAnime.episodes.map((anime) => (
                        <div key={anime.link} className="result-info" onClick={() => {}}>
                            <div>
                                <h1>{anime.title}</h1>
                                <div className="progress"><hr/></div>
                                <h2>{anime.date}</h2>
                            </div>
                        </div>

                    ))}
                </div>

        </div>
    );
}

export default Search;
