import { invoke } from "@tauri-apps/api/tauri";
import { link } from "fs";
import { title } from "process";
import { ReactElement, useState } from "react";
import {  NavigateFunction, useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';





export type Anime = {
    title: string,
    pageurl: string,
    imageurl: string,
    episode_count: string,
    date: string
};

type ResultListProps = {
    searchResult: Anime[];
    setinfoAnime: React.Dispatch<React.SetStateAction<AnimeInfo>>;
};

export type Episode = {
    title: string,
    link: string,
    date: string
}

export type AnimeInfo = {
    title: string,
    pageurl: string,
    imageurl: string,
    episode_count: string,
    episode_total: string,
    date: string,
    genres: string,
    description: string
    episodes: Episode[]
}




// build component for search result
export async function search(name: string) {
    console.log("name: " + name);
    const res: string[] = await invoke("search_anime", { title: name });
    console.log(res);
    return res;
}

async function moveInfoPage(navigate: NavigateFunction, {setinfoAnime}: ResultListProps, anime: Anime){
    // Vec<(String, String, String, Vec<(String, String, String)>)
    // navigate('/info');
    const res: string[][] = await invoke("getAnimeInfo", { url:  anime.pageurl});
    const episodes: Episode[] = [];
    for (let i = 0; i < res[0][7].length; i++){
        const episode: Episode = {
            title: res[0][7][i][0][0],
            link: res[0][7][i][0][1],
            date: res[0][7][i][0][2]
        }
        episodes.push(episode);

    }
    const animeInfo: AnimeInfo = {
        title: res[0][0],
        pageurl: res[0][1],
        imageurl: res[0][2],
        episode_count: anime.episode_count,
        episode_total: res[0][3],
        date: res[0][4],
        genres: res[0][5],
        description: res[0][6],
        episodes: episodes};
    setinfoAnime(animeInfo);
    window.scroll({ 
        top: 0, 
        left: 0
    });

    navigate('/info');
}



export default function ResultList({searchResult, setinfoAnime}: ResultListProps) {
    const navigate = useNavigate();
    return (
        <>
            {searchResult.map((anime) => (

                // <Link key={anime.pageurl} to="/info" onClick={() => {moveInfoPage(anime)}}>
                //     <div className="result" >
                //         <img src={anime.imageurl} alt="" />
                //         <div>
                //             <h1>{anime.title}</h1>
                //             <h2>Episodes: {anime.episode_count}</h2>
                //             <h2>Released: {anime.date}</h2>
                //         </div>
                //     </div>
                // </Link>
                <div key={anime.pageurl} className="result" onClick={() => {moveInfoPage(navigate, {searchResult, setinfoAnime}, anime)}}>
                    <img src={anime.imageurl} alt="" />
                    <div>
                        <h1>{anime.title}</h1>
                        <h2>Episodes: {anime.episode_count}</h2>
                        <h2>Released: {anime.date}</h2>
                    </div>
                </div>

            ))}
        </>
    );
}
