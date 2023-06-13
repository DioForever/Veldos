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
import { getAnime, saveAnime } from '../../../components/functions/Database';


interface AnimeInfoItemProps {
  search_url: string | null,
  episode_url: string | null
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
        last = episodes[i - 1][0];
        console.log("last", last);
      }
      if (i < episodes.length - 1) {
        next = episodes[i + 1][0];
        console.log("next", next);
      }
    }
  }
  return [last, next];
}

function goToEpisode(url: string, episode_name: string, router: AppRouterInstance, episode_next: string,
  episode_last: string, episode_url: string) {
  router.push("/WatchEpisode?search_url=" + url + "&episode_name=" + episode_name + "&episode_last=" + episode_last + "&episode_next=" + episode_next + "&episode_url=" + episode_url,);
  // navigate("/watchEpisode");
}

async function updateAnime(animeItem: AnimeItem) {
  if (await getAnime(animeItem.title) == true) {
    console.log("saving Item: ", animeItem);
    saveAnime(animeItem);
  }
}


export default function EpisodeView() {
  const [search_url, setSearch_url] = useState<string>("");
  const [episode_url, setEpisode_url] = useState<string>("");
  const [episode_name, setEpisode_name] = useState<string>("");
  const [episode_last, setEpisode_last] = useState<string>("");
  const [episode_next, setEpisode_next] = useState<string>("");
  const [lastInfo, setLastInfo] = useState<string>("");
  const [animeItem, setAnimeItem] = useState<AnimeItem>({} as AnimeItem);
  const [loaded, setLoaded] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [lastEpisodeName, setLastEpisodeName] = useState<string>("");
  const [path, setPath] = useState<string>("");
  const [res, setRes] = useState<AnimeInfo>({
    title: "",
    pageurl: "",
    imageurl: "",
    episode_count: "",
    date: "",
    genres: "",
    description: "",
    episodes: [],

  } as AnimeInfo);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    console.log("loaded: ", loaded);
    console.log("saving: ", animeItem.episode);
    saveLast(animeItem);
    updateAnime(animeItem);

  }, [animeItem]);

  useEffect(() => {
    console.log("reloaded man");
    if (animeItem.title != "") {
      console.log("loaded: ", loaded);
      console.log("saving: ", animeItem.episode);
      saveLast(animeItem);
      updateAnime(animeItem);
    }
    setPath("/anime/" + res.title + "/" + episode_name + ".mp4");
  }, [episode_last]);


  useEffect(() => {
    const search_url_get = searchParams.get("search_url");
    const episode_name_get = searchParams.get("episode_name");
    const episode_url_get = searchParams.get("episode_url");
    let episode_last_get = searchParams.get("episode_last");
    let episode_next_get = searchParams.get("episode_next");
    setSearch_url(search_url_get as string);
    setEpisode_name(episode_name_get as string);
    setEpisode_url(episode_url_get as string);
    setEpisode_last(episode_last_get as string);
    setEpisode_next(episode_next_get as string);





    if (search_url != null && search_url != lastInfo) {
      setLastInfo(search_url);
      search_urlAnimeInfo(search_url).then((res: AnimeInfo) => {

        setRes(res);
        console.log("res" + res.title, res.title == undefined);

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
        setPath("/anime/" + res.title + "/" + episode_name + ".mp4");
        const videoPlayer = videoRef.current;



      });
    }

  },);

  useEffect(() => {
    const videoPlayer = videoRef.current;

    console.log("patssh", path);
  }, [path]);


  // const episode_url = "";
  console.log("search_url: " + search_url);
  console.log("episode_name: " + episode_name);



  console.log(search_url);

  return (
    <div className={styles.infoBody}>

      <div className={styles.infoDescription}>
        {/* <video src={"anime/" + res.title / matchEpisode(episode_url, res.episodes)}></video> */}
        <video className={styles.video} ref={videoRef} src={path} controls width="640" height="360"></video>
      </div>
      <h1>{res.title} {episode_name}</h1>
      <div className={styles.infoContinue}>
        {/* TODO: bad input, got url instead of episode name */}
        <button onClick={() => {
          if (episode_last != null) {
            let ep_last = getLastNextEpisode(episode_last, res.episodes)[0];
            let ep_next = getLastNextEpisode(episode_last, res.episodes)[1];
            setLoaded(false);
            goToEpisode(search_url, episode_last, router, ep_last, ep_next, "");
          }
        }}>Previous episode</button>
        <button onClick={() => {
          if (episode_next != null) {
            let ep_last = getLastNextEpisode(episode_next, res.episodes)[0];
            let ep_next = getLastNextEpisode(episode_next, res.episodes)[1];
            setLoaded(false);
            goToEpisode(search_url, episode_next, router, ep_last, ep_next, "");
          }
        }}>Next episode</button>
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
    </div>
  );
}
