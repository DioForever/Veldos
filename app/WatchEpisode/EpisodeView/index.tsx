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
import { useRouter } from 'next/navigation';


interface AnimeInfoItemProps {
  search_url: string | null,
  episode_url: string | null
}

function goToEpisode(url: string, router: AppRouterInstance) {
  console.log(url);
  router.push("/WatchEpisode?search_url=" + url);
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

const matchEpisode = (url: string, episodes: string[]) => {
  for (let i = 0; i < episodes.length; i++) {
    if (episodes[0][1] == url) {
      return episodes[0][0];
    }
  }
  return "";
}

const EpisodeView = ({ search_url, episode_url }: AnimeInfoItemProps) => {
  const router = useRouter();
  const [episodeView, setEpisodeView] = useState<JSX.Element>(<></>);
  const [lastInfo, setLastInfo] = useState<string>("");
  console.log(search_url);
  const videoRef = useRef<HTMLVideoElement>(null);



  if (search_url != null && search_url != lastInfo) {
    setLastInfo(search_url);
    search_urlAnimeInfo(search_url).then((res: AnimeInfo) => {
      console.log("res" + res.title, res.title == undefined);
      if (res.title == undefined) {
        return episodeView;
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
      const video = videoRef.current;
      useEffect(() => {
        if (episode_url != null && video != null) {
          // video.src = "anime/" + res.title + "/" + matchEpisode(episode_url, res.episodes);
          video.src = "https://www.youtube.com/watch?v=COuNbRtYIA8&t=4s";
          video.load();
          video.play();
        }
      }, [video]);

      setEpisodeView(
        <div className={styles.infoBody}>

          <div className={styles.infoDescription}>
            <h1>sad</h1>
            {/* <video src={"anime/" + res.title / matchEpisode(episode_url, res.episodes)}></video> */}
            <video ref={videoRef} controls width="640" height="360"></video>
          </div>
          <div className={styles.infoContinue}>
            {/* <button>Episode back</button>
            <button>Episode forward</button> */}
          </div>
          <div className={styles.episodes}>
            {res.episodes.map((episode: string[]) => {
              return (
                <div key={res.pageurl} className={styles.episode}>
                  <div onClick={() => { goToEpisode(res.pageurl, router) }}>
                    <h3>{episode[0][0]}</h3>
                    <p>{episode[0][2]}</p>
                  </div>
                  <button>Download</button>
                </div>
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