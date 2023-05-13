import { invoke } from "@tauri-apps/api/tauri";
import { ReactElement, useState } from "react";



export type Anime = {
    title: string,
    pageurl: string,
    imageurl: string,
    episode_count: string,
    date: string
};

type ResultListProps = {
    searchResult: Anime[];
};



// build component for search result
export async function search(name: string) {
    console.log("name: " + name);
    const res: string[][] = await invoke("search_anime", { title: name });
    console.log(res);
    return res;
}



export default function ResultList({ searchResult }: ResultListProps) {

    return (
        <>
            {searchResult.map((anime) => (
                <div key={anime.pageurl} className="result">
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
