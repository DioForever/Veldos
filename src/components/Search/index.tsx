import { ReactNode } from 'react';
import { AnimeSearch } from '../../App';
import { HeartIcon as HeartFEmpty} from '@heroicons/react/24/outline';
import { HeartIcon as HeartFull} from '@heroicons/react/20/solid';
import './style.css';

interface SearchProps {
  searchResponse: AnimeSearch[];
}

export function Search({searchResponse}: SearchProps) {
  const liked = false;
  return (
    <>
      <div className="search">
        {searchResponse.map((anime) => {
          return (
            <div className='border'>
            <div key={anime.image_url} className="anime" onClick={() => {console.log("Click anime")}}>
              <div className="anime-image">
                <img src={anime.image_url} alt="anime" />
              </div>
              <div className="anime-info">
                <div className="anime-title">{anime.title}</div>
                <div className="anime-episodes">Episodes: {anime.episodes}</div>
                <div className="anime-time">Last release: {anime.time}</div>

              </div>

            </div>
            <div className='like' onClick={() => {console.log("Click like")}}>                
                  {(liked) ? (<HeartFull className="heart-icon"/>) : (<HeartFEmpty className="heart-icon"/>)}
            </div>
            </div>
          );
        })
        }
      </div>
      
    </>
  );
}
