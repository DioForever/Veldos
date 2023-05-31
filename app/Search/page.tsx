"use client"
import { ReactNode, useEffect, useState } from 'react';
import { AnimeSearch, AnimeInfo } from '../../app/page';
// import { HeartIcon as HeartFEmpty } from '@heroicons/react/24/outline';
// import { HeartIcon as HeartFull } from '@heroicons/react/20/solid';
import './style.css';
// import { NavigateFunction, useNavigate } from 'react-router-dom';
import { invoke } from '@tauri-apps/api';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Layout from '@/components/view/Layout';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';

interface SearchProps {
  searchResponse: AnimeSearch[];
  setAnimeInfo: React.Dispatch<React.SetStateAction<AnimeInfo>>;
}

// title: string;
// pageurl: string;
// imageurl: string;
// episode_count: string;
// date: string;
// genres: string;
// description: string;
// episodes: any;

function loadAnimeInfo(url: string, router: AppRouterInstance) {
  router.push("/AnimeInfoPage?search_url=" + url);
  // let animeInfo: any = []
  // invoke("getAnimeInfo", { url }).then((animeInfoRaw: any) => {
  //   animeInfo = (animeInfoRaw);
  //   setAnimeInfo({
  //     title: animeInfo[0][0],
  //     pageurl: animeInfo[0][1],
  //     imageurl: animeInfo[0][2],
  //     episode_count: animeInfo[0][3],
  //     date: animeInfo[0][4],
  //     genres: animeInfo[0][5],
  //     description: animeInfo[0][6],
  //     episodes: animeInfo[0][7]
  //   });
  //   console.log(animeInfo);
  //   router.push("/animeinfo");
  //   scrollTo(0, 0);
  // });

}

async function searchAnime(name: string, setSearchResponse: React.Dispatch<React.SetStateAction<AnimeSearch[]>>) {
  console.log("name: " + name);
  setSearchResponse([]);
  const res: string[] = await invoke("search_anime", { title: name });
  console.log(res);
  setSearchResponse(res.map((anime) => {
    return {
      title: anime[0],
      url: anime[1],
      image_url: anime[2],
      episodes: anime[3],
      time: anime[4],
    }
  }));

}


let loaded = false;

export default function Search() {
  const router = useRouter();
  const [searchResponse, setSearchResponse] = useState<AnimeSearch[]>([]);
  const searchParams = useSearchParams();
  useEffect(() => {
    const search = searchParams.get("search_url");
    if (search) {
      searchAnime(search, setSearchResponse);
    }
    loaded = true;
  }, []);



  return (
    <Layout>
      <div className="search">
        {searchResponse.map((anime) => {
          return (
            <div key={anime.url} className='box'>
              <div className="anime" onClick={() => { loadAnimeInfo(anime.url, router) }}>
                <div className="anime-image">
                  <img src={anime.image_url} alt="anime" />
                </div>
                <div className="anime-info">
                  <div className="anime-title">{anime.title}</div>
                  <div className="anime-episodes">Episodes: {anime.episodes}</div>
                  <div className="anime-time">Last release: {anime.time}</div>
                </div>
              </div>
            </div>
          );
        })
        }
      </div>
    </Layout>
  );
}
