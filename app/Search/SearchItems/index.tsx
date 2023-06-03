"use client"
import { AnimeSearch } from '@/app/page';
import { invoke } from '@tauri-apps/api/tauri';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './SearchItems.module.css';

interface SearchItemsProps {
  search: string | null,
}


async function searchAnime(name: string) {
  console.log("name: " + name);
  const map: AnimeSearch[] = await invoke("search_anime", { title: name }).then((res: any) => {
    console.log(res);
    const items = (res.map((anime: any[]) => {
      const an: AnimeSearch = {
        title: anime[0],
        url: anime[1],
        image_url: anime[2],
        episodes: anime[3],
        time: anime[4],
      }
      return an;
    }));
    return items;
  });
  console.log("map: " + map);
  return map;
}

function loadAnimeInfo(url: string, router: AppRouterInstance) {
  router.push("/AnimeInfoPage?search_url=" + url);
}



export default function SearchItems({ search }: SearchItemsProps) {
  const router = useRouter();
  const [searchResponse, setSearchResponse] = useState<JSX.Element>(<></>);
  const [lastSearch, setLastSearch] = useState<string>("");

  console.log(search);

  if (search != null && search != lastSearch) {
    setLastSearch(search);
    searchAnime(search).then((res) => {
      console.log("res" + res);
      const map = res.map((anime: any) => {
        return (
          <div key={anime.url} className={styles.box}>
            <div className={styles.anime} onClick={() => { loadAnimeInfo(anime.url, router) }}>
              <div className={styles.animeImage}>
                <img src={anime.image_url} alt="anime" />
              </div>
              <div className={styles.animeInfo}>
                <div className={styles.animeTitle}>{anime.title}</div>
                <div className={styles.animeEpisodes}>Episodes: {anime.episodes}</div>
                <div className={styles.animeTime}>Last release: {anime.time}</div>
              </div>
            </div>
          </div>
        );
      })
      console.log("map: ");
      setSearchResponse(<>
        <h1 className={styles.search}>Search for {search}</h1>
        {map}
      </>)

    });
  }

  return (
    searchResponse
  );


  // const map = searchResponse.map((anime: any) => {
  //   return (
  //     <div key={anime.url} className='box'>
  //       <div className="anime" onClick={() => { loadAnimeInfo(anime.url, router) }}>
  //         <div className="anime-image">
  //           <img src={anime.image_url} alt="anime" />
  //         </div>
  //         <div className="anime-info">
  //           <div className="anime-title">{anime.title}</div>
  //           <div className="anime-episodes">Episodes: {anime.episodes}</div>
  //           <div className="anime-time">Last release: {anime.time}</div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // })
  // return <>{map}</>;

}
