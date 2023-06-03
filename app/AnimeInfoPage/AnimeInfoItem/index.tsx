"use client"
import { AnimeInfo } from '@/app/page';
import { invoke } from '@tauri-apps/api/tauri';
import { ReactNode, useState } from 'react';
// import ImageComponent from '../../components/ImageComponent';
// import { NavigateFunction, useNavigate } from 'react-router-dom';
import DescriptionComponent from '../../../components/functions/DescriptionComponent';
import ImageComponent from '../../../components/functions/ImageComponent';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import styles from './AnimeInfoItem.module.css';


interface AnimeInfoItemProps {
  search: string | null
}

function goToEpisode(url: string, episode_url, router: AppRouterInstance) {
  console.log("aladin ", url, episode_url);
  router.push("/WatchEpisode?search_url=" + url + "&episode_url=" + episode_url);
  // navigate("/watchEpisode");
}


async function searchAnimeInfo(name: string) {
  const res: string[] = await invoke("getAnimeInfo", { url: name });
  console.log("--------------------")
  console.log(res);
  console.log("--------------------")

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
  return animeInfoItem;


}

const AnimeInfoItem = ({ search }: AnimeInfoItemProps) => {
  const router = useRouter();
  const [animeInfo, setAnimeInfo] = useState<JSX.Element>(<></>);
  const [lastInfo, setLastInfo] = useState<string>("");

  console.log(search);

  if (search != null && search != lastInfo) {
    setLastInfo(search);
    searchAnimeInfo(search).then((res: AnimeInfo) => {
      console.log("res" + res.title, res.title == undefined);
      if (res.title == undefined) {
        return animeInfo;
      }
      console.log("res" +
        "title: " + res.title
        + " pageurl: " + res.pageurl
        + " imageurl: " + res.imageurl
        + " episode_count: " + res.episode_count
        + " date: " + res.date
        + " genres: " + res.genres
        + " description: " + res.description
        + " episodes: " + res.episodes);
      setAnimeInfo(
        <div className={styles.infoBody}>
          <ImageComponent imageUrl={res.imageurl} />
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
            <h2>Continue watching at Episode 1</h2>
          </div>
          <div className={styles.episodes}>
            {res.episodes.map((episode: string[]) => {
              return (
                <div key={res.pageurl} className={styles.episode} onClick={() => { goToEpisode(res.pageurl, episode[0][1], router) }}>
                  <h3>{episode[0][0]}</h3>
                  <p>{episode[0][2]}</p>
                </div>
              )
            })}

          </div>
        </div>
      );

    });
  }

  return (
    animeInfo
  );

}

export default AnimeInfoItem;