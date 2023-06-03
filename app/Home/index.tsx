"use client"
import { ReactNode } from 'react';
import styles from './Home.module.css';
import Layout from '@/components/view/Layout';
import AnimeBox from './AnimeBox';
import { invoke } from '@tauri-apps/api/tauri';
// import sqlite3 from 'sqlite3';
// import { getAnime, saveAnime } from '@/components/functions/DataBase';
import Download from '@/components/functions/Download';
import { getAnime, saveAnime } from '../../components/functions/DataBase';
// import InteractiveButton from './InteractiveButton';


interface HomeProps {
  children: ReactNode;
}

export type AnimeItem = {
  title: string,
  url: string,
  img: string,
  status: string,
  episode: string,
}




const addAnime = async (anime: AnimeItem) => {
  const res: string[] = await invoke("add_anime");
  // const res: string[] = await invoke("addAnime", { url: name });
  console.log(res);
}

const getData = () => {



  const lastWatched: AnimeItem = {
    title: "Dr. Stone: New World (Dub)",
    url: "https://animeheaven.ru/detail/dr-stone-new-world-dub",
    img: "https://static.anmedm.com/media/imagesv2/2023/04/Dr-STONE-NEW-WORLD-Dub.jpg",
    status: "Ongoing",
    episode: "7",
  }

  const unfinished: AnimeItem[] = [
    {
      title: "One Piece",
      url: "https://animeheaven.ru/detail/dr-stone-new-world-dub",
      img: "https://static.anmedm.com/media/imagesv2/2023/04/Dr-STONE-NEW-WORLD-Dub.jpg",
      status: "Ongoing",
      episode: "7",
    } as AnimeItem,
    {
      title: "One Piece",
      url: "https://animeheaven.ru/detail/dr-stone-new-world-dub",
      img: "https://static.anmedm.com/media/imagesv2/2023/04/Dr-STONE-NEW-WORLD-Dub.jpg",
      status: "Ongoing",
      episode: "7",
    } as AnimeItem,
    {
      title: "One Piece",
      url: "https://animeheaven.ru/detail/dr-stone-new-world-dub",
      img: "https://static.anmedm.com/media/imagesv2/2023/04/Dr-STONE-NEW-WORLD-Dub.jpg",
      status: "Ongoing",
      episode: "7",
    } as AnimeItem,
    {
      title: "One Piece",
      url: "https://animeheaven.ru/detail/dr-stone-new-world-dub",
      img: "https://static.anmedm.com/media/imagesv2/2023/04/Dr-STONE-NEW-WORLD-Dub.jpg",
      status: "Ongoing",
      episode: "7",
    } as AnimeItem,
    {
      title: "One Piece",
      url: "https://animeheaven.ru/detail/dr-stone-new-world-dub",
      img: "https://static.anmedm.com/media/imagesv2/2023/04/Dr-STONE-NEW-WORLD-Dub.jpg",
      status: "Ongoing",
      episode: "7",
    } as AnimeItem,
    {
      title: "One Piece",
      url: "https://animeheaven.ru/detail/dr-stone-new-world-dub",
      img: "https://static.anmedm.com/media/imagesv2/2023/04/Dr-STONE-NEW-WORLD-Dub.jpg",
      status: "Ongoing",
      episode: "7",
    } as AnimeItem,
    {
      title: "One Piece",
      url: "https://animeheaven.ru/detail/dr-stone-new-world-dub",
      img: "https://static.anmedm.com/media/imagesv2/2023/04/Dr-STONE-NEW-WORLD-Dub.jpg",
      status: "Ongoing",
      episode: "7",
    } as AnimeItem
  ]
  const finished: AnimeItem[] = [
    {
      title: "One Piece",
      url: "https://animeheaven.ru/detail/dr-stone-new-world-dub",
      img: "https://static.anmedm.com/media/imagesv2/2023/04/Dr-STONE-NEW-WORLD-Dub.jpg",
      status: "Ongoing",
      episode: "7",
    } as AnimeItem,
    {
      title: "One Piece",
      url: "https://animeheaven.ru/detail/dr-stone-new-world-dub",
      img: "https://static.anmedm.com/media/imagesv2/2023/04/Dr-STONE-NEW-WORLD-Dub.jpg",
      status: "Ongoing",
      episode: "7",
    } as AnimeItem
  ]

  return { lastWatched, unfinished, finished }
}
const data = getData();

const lastWatched = data.lastWatched;
const unfinished = data.unfinished;
const finished = data.finished;

const style = {
  backgroundImage: `url(${lastWatched.img})`,
}



export function Home() {


  return (
    <Layout>
      <div className={styles.home}>
        <h1 className={styles.title}>Last watched</h1>
        <div className={styles.lastWatched} style={style}>
          <div className={styles.box}>
            <div className={styles.description}>
              <h1>{lastWatched.title}</h1>
              <h2>{lastWatched.status}</h2>
              <h2>{lastWatched.episode} Episodes</h2>
            </div>
            <button
              onClick={() => getAnime("Dr. Stone: New World (Dub)")}
            >Continue watching</button>

          </div>
        </div>
        <h1 className={styles.title}>Unfinished</h1>
        <div className={styles.boxUn}>
          <div className={styles.group}>
            {unfinished.map((item, index) => {
              return (
                <AnimeBox anime={item} index={index} />
              )
            })}
          </div>
        </div>
        <h1 className={styles.title}>Finished</h1>
        <div className={styles.boxUn}>
          <div className={styles.group}>
            {finished.map((item, index) => {
              return (
                <AnimeBox anime={item} index={index} />
              )
            })}
          </div>
        </div>
      </div>
      {/* <Download url={''} /> */}
    </Layout>
  );
}
export default Home;