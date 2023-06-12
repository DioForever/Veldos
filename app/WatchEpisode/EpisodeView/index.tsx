"use client"
import { AnimeInfo } from '@/app/page';
import { invoke } from '@tauri-apps/api/tauri';
import { ReactNode, useState, useRef, useEffect, use } from 'react';
// import ImageComponent from '../../components/ImageComponent';
// import { NavigateFunction, useNavigate } from 'react-router-dom';
import DescriptionComponent from '../../../components/functions/DescriptionComponent';
import ImageComponent from '../../../components/functions/ImageComponent';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import styles from './EpisodeView.module.css';
import { useRouter, useSearchParams } from 'next/navigation';
import EpisodeBox from '@/app/AnimeInfoPage/EpisodeBox';
import { title } from 'process';
import { saveLast } from '@/components/functions/Database';
import { AnimeItem } from '@/app/Home';


interface AnimeInfoItemProps {
  search_url: string | null,
  episode_url: string | null
}

function goToEpisode(url: string, episode_name: string, router: AppRouterInstance, episode_next: string, episode_last: string, episode_url: string) {
  router.push("/WatchEpisode?search_url=" + url + "&episode_name=" + episode_name + "&episode_last=" + episode_last + "&episode_next=" + episode_next + "&episode_url=" + episode_url);
  // navigate("/watchEpisode");
}


async function search_urlAnimeInfo(name: string) {
  const res: string[] = await invoke("getAnimeInfo", { url: name });
  console.log(res);
  // return vec![(title, url ,img, episode_count, release_date, genres, description, episodes)];
  const animeInfo: AnimeInfo = {
    title: res[0][0],
    pageurl: res[0][1],
    imageurl: res[0][2],
    episode_count: res[0][3],
    date: res[0][4],
    genres: res[0][5],
    description: res[0][6],
    episodes: res[0][7],
  }
  return animeInfo


}


const getLastNextEpisode = (url_current: string, episodes: string[][]) => {
  let last = "";
  let next = "";
  for (let i = 0; i < episodes.length; i++) {
    if (episodes[i][1] == url_current) {
      if (i > 0) {
        last = episodes[i - 1][1];
      }
      if (i < episodes.length - 1) {
        next = episodes[i + 1][1];
      }
    }
  }
  return [last, next];
}

const EpisodeView = () => {


  const searchParams = useSearchParams();
  const search_url = searchParams.get("search_url");
  const episode_name = searchParams.get("episode_name");
  const episode_url = searchParams.get("episode_url");
  let episode_last = searchParams.get("episode_last");
  let episode_next = searchParams.get("episode_next");


  if (episode_next == null) {
    episode_next = "";
  }

  // const episode_url = "";
  console.log("search_url: " + search_url);
  console.log("episode_name: " + episode_name);


  const router = useRouter();
  const [episodeView, setEpisodeView] = useState<JSX.Element>(<></>);
  const [lastInfo, setLastInfo] = useState<string>("");
  const [animeItem, setAnimeItem] = useState<AnimeItem>({} as AnimeItem);

  console.log(search_url);
  const videoRef = useRef<HTMLVideoElement>(null);
  let path = "";

  useEffect(() => {
    console.log("last watch", [animeItem.title, animeItem.url, animeItem.img, animeItem.episode, animeItem.episode_url, animeItem.episode_count, animeItem.episode_last]);
    saveLast(animeItem);
  }, [animeItem]);

  useEffect(() => {
    const videoPlayer = videoRef.current;

    if (videoPlayer) {
      videoPlayer.src = path;
      videoPlayer.play();
    }
  }, [path]);

  if (search_url != null && search_url != lastInfo) {
    setLastInfo(search_url);
    search_urlAnimeInfo(search_url).then((res: AnimeInfo) => {
      console.log("res" + res.title, res.title == undefined);
      if (res.title == undefined) {
        return episodeView;
      }

      let animeIt = {
        title: res.title,
        url: res.pageurl,
        img: res.imageurl,
        episode: res.episodes.length.toString(),
        episode_url: episode_url,
        episode_count: res.episode_count,
        episode_last: episode_name,
      } as AnimeItem;
      setAnimeItem(animeIt);
      // console.log("last watch", animeItem);



      console.log("res" +
        "title: " + res.title
        + " pageurl: " + res.pageurl
        + " imageurl: " + res.imageurl
        + " episode_count: " + res.episode_count
        + " date: " + res.date
        + " genres: " + res.genres
        + " description: " + res.description
        + " episodes: " + res.episodes);
      // path = "public/anime/" + res.title + "/" + episode_name;
      // path = "/anime/" + res.title + "/" + episode_name;
      path = "/anime/" + res.title + "/" + episode_name + ".mp4";
      console.log("path", path);


      setEpisodeView(
        <div className={styles.infoBody}>

          <div className={styles.infoDescription}>
            {/* <video src={"anime/" + res.title / matchEpisode(episode_url, res.episodes)}></video> */}
            <video className={styles.video} ref={videoRef} src={path} controls width="640" height="360"></video>
          </div>
          <h1>{res.title} {episode_name}</h1>
          <div className={styles.infoContinue}>
            <button onClick={() => {
              if (episode_last != null) {
                let ep_last = getLastNextEpisode(episode_last, res.episodes)[0];
                let ep_next = getLastNextEpisode(episode_last, res.episodes)[1];
                goToEpisode(search_url, episode_last, router, ep_last, ep_next, "");
              }
            }}>Previous episode</button>
            <button>Next episode</button>
          </div>
          <div className={styles.episodes}>
            {res.episodes.map((episode: string[], index: number, array: any) => {
              const episode_last = index > 0 ? array[index - 1][0][1] : null;
              const episode_next = index < array.length - 1 ? array[index + 1][0][1] : null;
              console.log("episode")
              console.log(episode_last);
              console.log(episode_next);
              console.log("---------")
              return (
                <EpisodeBox episode={episode} res={res} episode_last={episode_last} episode_next={episode_next} />
              )
            })}

          </div>
        </div>
      );

    });
  }

  return (
    episodeView
  );
}

export default EpisodeView;