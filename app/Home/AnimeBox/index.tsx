import { ReactNode } from 'react';
import { AnimeItem } from '..';
import styles from './AnimeBox.module.css';

interface AnimeBoxProps {
  anime: AnimeItem,
  index: number
}

export default function AnimeBox({ anime, index }: AnimeBoxProps) {
  const style = {
    backgroundImage: `url(${anime.img})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }

  return (
    <div className={styles.animeItem} key={index}>
      <img src={anime.img} alt="" />
      <div className={styles.description}>
        <h1>{anime.title}</h1>
        <h2>{anime.status}</h2>
        <h2>{anime.episode_count} Episodes</h2>
      </div>
    </div>
  );
}
