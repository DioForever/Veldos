import { ReactNode } from 'react';
import { AnimeSearch, AnimeInfo } from '../../App';
import { HeartIcon as HeartFEmpty } from '@heroicons/react/24/outline';
import { HeartIcon as HeartFull } from '@heroicons/react/20/solid';
import './style.css';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { invoke } from '@tauri-apps/api';

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

function loadAnimeInfo(url: string, setAnimeInfo: React.Dispatch<React.SetStateAction<AnimeInfo>>, navigate: NavigateFunction) {
  let animeInfo: any = []
  invoke("getAnimeInfo", { url }).then((animeInfoRaw: any) => {
    animeInfo = (animeInfoRaw);
    setAnimeInfo({
      title: animeInfo[0][0],
      pageurl: animeInfo[0][1],
      imageurl: animeInfo[0][2],
      episode_count: animeInfo[0][3],
      date: animeInfo[0][4],
      genres: animeInfo[0][5],
      description: animeInfo[0][6],
      episodes: animeInfo[0][7]
    });
    console.log(animeInfo);
    navigate("/animeinfo");
    scrollTo(0, 0);
  });

}




export function Search({ searchResponse, setAnimeInfo }: SearchProps) {
  const navigate = useNavigate();
  return (
    <>
      <div className="search">
        {searchResponse.map((anime) => {
          return (
            <div key={anime.url} className='border'>
              <div className="anime" onClick={() => { loadAnimeInfo(anime.url, setAnimeInfo, navigate) }}>
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

    </>
  );
}
