"use client"
import { AnimeInfo } from '@/app/page';
import { invoke } from '@tauri-apps/api/tauri';
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
// import ImageComponent from '../../components/ImageComponent';
// import { NavigateFunction, useNavigate } from 'react-router-dom';
import DescriptionComponent from '../../../components/functions/DescriptionComponent';
import ImageComponent from '../../../components/functions/ImageComponent';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import styles from './AnimeInfoItem.module.css';
import { useSearchParams } from 'next/navigation';
import EpisodeBox from '../EpisodeBox';
import { saveAnime, removeAnime, getAnime } from '@/components/functions/Database';
import { AnimeItem } from '@/app/Home';
import { getAnimeEpisode } from '../../../components/functions/Database';



interface AnimeInfoItemProps {

}


function getEpisode(title: string, setEpisode: Dispatch<SetStateAction<string>>) {
  let aniItem = getAnimeEpisode(title).then((aniItem: any) => {
    if (aniItem.length > 0) {
      console.log("aniItem", aniItem);
      setEpisode(aniItem[0].episode_last);
    }
  });
  // setEpisode(await getAnimeEpisode(title))
}

function goToEpisode(url: string, episode_name: string, router: AppRouterInstance) {
  // console.log("aladin ", url, episode_name);
  router.push("/WatchEpisode?search_url=" + url + "&episode_name=" + episode_name + "&episode_last=" + "" + "&episode_next=" + "" + "&episode_url=" + "");
  // navigate("/watchEpisode");
}


export default function AnimeInfoItem() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search_url");

  function likeAnime(animeInf: AnimeInfo) {
    if (liked == false) {
      // console.log("added");
      const animeItem: AnimeItem = {
        title: animeInf.title,
        url: animeInf.pageurl,
        img: animeInf.imageurl,
        episode: animeInf.episodes.length.toString(),
        episode_url: animeInf.episodes[animeInf.episodes.length - 1][0][1],
        episode_count: animeInf.episode_count,
        episode_last: "Episode 1",

      }
      // console.log("saving ", [animeItem.title, animeItem.url, animeItem.img, animeItem.episode, animeItem.episode_url, animeItem.episode_count, animeItem.episode_last]);
      saveAnime(animeItem);
    } else {
      // console.log("remove");
      removeAnime(animeInf.title);
    }
    setLiked(!liked);
  }


  const router = useRouter();
  const [liked, setLiked] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [episode, setEpisode] = useState<string>("");
  const [res, setResponse] = useState<AnimeInfo>(

    {
      title: "",
      pageurl: "",
      imageurl: "",
      episode_count: "",
      date: "",
      genres: "",
      description: "",
      episodes: [],
    }
  );

  if (loaded == false && search != null) {
    setLoaded(true);
    searchAnimeInfo(search, setResponse, setLiked);

  }
  if (episode == "") {
    getEpisode(res.title, setEpisode);
  }

  // useEffect(() => {

  //   getAnimeEpisode(res.title).then((episode) => {
  //     setEpisode(episode.episode_last);
  //   });

  // }, [res]);


  return (
    <div className={styles.infoBody}>
      <ImageComponent imageUrl={res.imageurl}>
        {
          liked == true ?
            <svg className={styles.fullheart} onClick={() => { likeAnime(res); }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg> :
            <svg className={styles.emptyheart} onClick={() => { likeAnime(res); }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
        }
      </ImageComponent>
      <div className={styles.infoDescription}>
        <div>
          <h1>{res.title}</h1>
          <h4>Episodes: {(res.episodes).length}/{res.episode_count}</h4>
          <h4>{res.genres}</h4>
          <h4>Release: {res.date}</h4>
          <h2>Description:</h2>
          <DescriptionComponent text={res.description} maxLengthPercentage={20} />
        </div>
      </div>
      <div className={styles.infoContinue}>
        <h2
          onClick={() => {
            if (res.title != "") {
              goToEpisode(res.pageurl, episode, router);
            }
          }}
        >Continue watching at {episode}</h2>
      </div>

      <div className={styles.episodes}>
        {res.episodes.map((episode: string[], index: number, array: any) => {
          const episode_last = index > 0 ? array[index - 1][0][1] : null;
          const episode_next = index < array.length - 1 ? array[index + 1][0][1] : null;
          return (
            <EpisodeBox episode={episode} res={res} episode_last={episode_last} episode_next={episode_next} />
          )
        })}

      </div>
    </div>);


}


async function searchAnimeInfo(name: string, setResponse: Dispatch<SetStateAction<AnimeInfo>>, setLiked: Dispatch<SetStateAction<boolean>>) {
  const res: string[] = await invoke("getAnimeInfo", { url: name });
  // console.log("--------------------")
  // console.log(res);
  // console.log("--------------------")

  // return vec![(title, url ,img, episode_count, release_date, genres, description, episodes)];
  const animeInfoItem: AnimeInfo = {
    title: res[0][0],
    pageurl: res[0][1],
    imageurl: res[0][2],
    episode_count: res[0][3],
    date: res[0][4],
    genres: res[0][5],
    description: res[0][6],
    episodes: res[0][7],
  }
  // console.log("getAnime" + await getAnime(animeInfoItem.title));
  if ((await getAnime(animeInfoItem.title))) {
    setLiked(true);
  }
  // if ((getAnime(animeInfoItem.title)).toString) {
  //   setLiked(true);
  // }
  setResponse(animeInfoItem);

}
