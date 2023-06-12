"use client"
import { AnimeInfo } from '@/app/page';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import styles from './EpisodeBox.module.css';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { useRouter } from 'next/navigation';
import { invoke } from '@tauri-apps/api/tauri';

interface EpisodeBoxProps {
  episode: string[],
  res: AnimeInfo,
  episode_last: string,
  episode_next: string
}

function goToEpisode(url: string, episode_name: string, router: AppRouterInstance, episode_next: string, episode_last: string, episode_url: string) {
  // console.log("aladin ", url, episode_name);
  router.push("/WatchEpisode?search_url=" + url + "&episode_name=" + episode_name + "&episode_last=" + episode_last + "&episode_next=" + episode_next + "&episode_url=" + episode_url);
  // navigate("/watchEpisode");
}

async function downloadEpisode(episode_url: string, title: string, episode: string, setDownloaded: Dispatch<SetStateAction<boolean>>) {
  // console.log("download ", episode_url, title, episode);
  const res = await invoke("download_episode", { url: episode_url, title: title, episode: episode });
  // console.log(res);
  setDownloaded(true);
}


async function checkExistence(title: string, episode: string) {
  const res = await invoke("check_episode", { title: title, episode: episode });
  // console.log(res);
  return res;
}


export default function EpisodeBox({ episode, res, episode_last, episode_next }: EpisodeBoxProps) {
  const router = useRouter();
  const [downloaded, setDownloaded] = useState<boolean>(false);
  const [downloading, setDownloading] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);

  if (checked == false) {
    checkExistence(res.title, episode[0][0]).then((res) => {
      // console.log(res);
      if (res == true) {
        setDownloaded(true);
      }
      setChecked(true);
    });
  }


  function downloadButton() {
    if (downloaded == true) {
      return (
        <button className={styles.downloadedButton}>
          Downloaded
        </button>
      );
    }
    if (downloading == true) {
      return (
        <div className={styles.downloadingButton}></div>
      );
    }
    return (
      <button className={styles.downloadButton}>
        Download
      </button>
    );
  }

  return (
    <div key={episode[0][1]} className={styles.episode} >
      <div className={styles.description} onClick={() => { goToEpisode(res.pageurl, episode[0][0], router, episode_last, episode_next, episode[0][1]) }}>
        <h3>{episode[0][0]}</h3>
        <p>{episode[0][2]}</p>
      </div>
      <div onClick={() => {
        if (downloaded == false && downloading == false) {
          setDownloading(true);
          downloadEpisode(episode[0][1], res.title, episode[0][0], setDownloaded);
        }
      }}>{downloadButton()}</div>
    </div>
  );
}
