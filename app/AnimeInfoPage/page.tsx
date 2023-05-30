"use client"
import { ReactNode, useState } from 'react';
import { AnimeSearch, AnimeInfo } from '../page';
import { useRouter } from 'next/navigation';
// import ImageComponent from '../../components/ImageComponent';
// import { NavigateFunction, useNavigate } from 'react-router-dom';
import DescriptionComponent from '../../components/functions/DescriptionComponent';
import ImageComponent from '../../components/functions/ImageComponent';
import './style.css';



// interface AnimeInfoPageProps {
//   getAnimeInfo: AnimeInfo;
// }

function goToEpisode(url: string) {
  const router = useRouter();
  console.log(url);
  router.push("/watchEpisode");
  // navigate("/watchEpisode");
}

function AnimeInfoPage() {
  const router = useRouter();
  const getAnimeInfo = {
    title: "title",
    imageurl: "imageurl",
    episodes: [["episode", "url", "title"]],
    pageurl: "pageurl",
    episode_count: "episode_count",
    date: "date",
    genres: "genres",
    description: "description",

  };
  // if (getAnimeInfo == {} as AnimeInfo) {
  //   router.push("/");
  //   scrollTo(0, 0);
  // }



  return (
    <body className='infoBody'>
      <ImageComponent imageUrl={getAnimeInfo.imageurl} />
      <div className='infoDescription'>
        <div>
          <h1>{getAnimeInfo.title}</h1>
          <h4>Episodes: {(getAnimeInfo.episodes).length}/{getAnimeInfo.episode_count}</h4>
          <h4>{getAnimeInfo.genres}</h4>
          <h4>Release: {getAnimeInfo.date}</h4>
          <h2>Description:</h2>
          <DescriptionComponent text={getAnimeInfo.description} maxLengthPercentage={20} />
        </div>
      </div>
      <div className='infoContinue'>
        <h2>Continue watching at Episode 1</h2>
      </div>
      <div className='episodes'>
        {getAnimeInfo.episodes.map((episode: string[]) => {
          return (
            <div key={getAnimeInfo.pageurl} className='episode' onClick={() => { goToEpisode(getAnimeInfo.pageurl) }}>
              <h3>{episode[0][0]}</h3>
              <p>{episode[0][2]}</p>
            </div>
          )
        })}

      </div>
    </body>



  );
}


export default AnimeInfoPage;