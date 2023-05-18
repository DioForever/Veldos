import { ReactNode } from 'react';
import { AnimeSearch } from '../../App';
import { HeartIcon as HeartFEmpty} from '@heroicons/react/24/outline';
import { HeartIcon as HeartFull} from '@heroicons/react/20/solid';
import './style.css';
import { useNavigate } from 'react-router-dom';

interface SearchProps {
  searchResponse: AnimeSearch[];
}


export function Search({searchResponse}: SearchProps) {
  const liked = false;
  const navigate = useNavigate();
  return (
    <>
      <div className="search">
        {searchResponse.map((anime) => {
          return (
            <div className='border'>
            <div key={anime.image_url} className="anime" onClick={() => {navigate('/animeinfo')}}>
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
