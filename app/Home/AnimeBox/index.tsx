"use client"
import { ReactNode } from 'react';
import { AnimeItem } from '..';
import styles from './AnimeBox.module.css';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { useRouter } from 'next/navigation';

interface AnimeBoxProps {
  anime: AnimeItem,
  index: number
}

function loadAnimeInfo(url: string, router: AppRouterInstance) {
  router.push("/AnimeInfoPage?search_url=" + url);
}

export default function AnimeBox({ anime, index }: AnimeBoxProps) {
  const router = useRouter();
  const style = {
    backgroundImage: `url(${anime.img})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }

  return (
    <div className={styles.animeItem} key={index} onClick={() => { loadAnimeInfo(anime.url, router) }}>
      <img src={anime.img} alt="" />
      <div className={styles.description}>
        <h1>{anime.title}</h1>
        <h2>{anime.episode_last.replace(/\D/g, '')}/{anime.episode}/{anime.episode_count} Episodes</h2>
      </div>
    </div>
  );
}
