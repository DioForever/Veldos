import { getAnimeList, getLast } from '@/components/functions/Database';
import { ReactNode, useState } from 'react';
import { AnimeItem } from '..';
import AnimeBox from '../AnimeBox';
import styles from './View.module.css';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { useRouter } from 'next/navigation';

interface ViewTsxProps {
  children: ReactNode;
}

const getData = async () => {
  const list = await getAnimeList();
  console.log(list);
  const lastWatched = await getLast();
  console.log(lastWatched);
  const data = {
    list: list,
    lastWatched: lastWatched
  }
  return (data);

}


function goToEpisode(url: string, episode_name: string, router: AppRouterInstance, episode_next: string, episode_last: string, episode_url: string) {
  // console.log("aladin ", url, episode_name);
  router.push("/WatchEpisode?search_url=" + url + "&episode_name=" + episode_name + "&episode_last=" + episode_last + "&episode_next=" + episode_next + "&episode_url=" + episode_url);
  // navigate("/watchEpisode");
}




export function View() {
  const [loaded, setLoaded] = useState(false);
  const [lastWatched, setLastWatched] = useState({} as AnimeItem);
  const [unfinished, setUnfinished] = useState([] as AnimeItem[]);
  const [finished, setFinished] = useState([] as AnimeItem[]);
  const router = useRouter();


  // const data = await getData();

  // const lastWatched = data.lastWatched;
  // const unfinished = data.unfinished;
  // const finished = data.finished;
  if (!loaded) {
    setLoaded(true);
    getData().then((res: any) => {
      const lastWatched = res.lastWatched;
      const unfinished = res.list;
      console.log(res);
      let unfinished_list = [] as AnimeItem[];
      console.log(unfinished[0]);
      if (res != null) {
        console.log("not null");
        for (let i = 0; i < unfinished.length; i++) {
          let anime = {
            title: unfinished[i].title,
            url: unfinished[i].url,
            img: unfinished[i].img,
            episode: unfinished[i].episode,
            episode_url: res.lastWatched.episode_url,
            episode_count: unfinished[i].episode_count,
            episode_last: unfinished[i].episode_last.replace(/\D/g, ''),
          } as AnimeItem;

          unfinished_list.push(anime);


        }
      }
      setUnfinished(unfinished_list);
      if (res.lastWatched[0] != undefined) {
        console.log(res.lastWatched[0]);
        const lWatched = {
          title: res.lastWatched[0].title,
          url: res.lastWatched[0].url,
          img: res.lastWatched[0].img,
          episode: res.lastWatched[0].episode,
          episode_url: res.lastWatched[0].episode_url,
          episode_count: res.lastWatched[0].episode_count,
          episode_last: res.lastWatched[0].episode_last.replace(/\D/g, ''),
        } as AnimeItem;
        console.log(lWatched);
        setLastWatched(lWatched);
        console.log("last watched man");
      }

      // setLastWatched(res.lastWatched);
      // setUnfinished(res.unfinished);
      // setFinished(res.finished);
    })
  }

  const style = {
    backgroundImage: `url(${lastWatched.img})`,
  }

  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Last watched</h1>
      <div className={styles.lastWatched} style={style}>
        <div className={styles.box}>
          <div className={styles.description}>
            <h1>{lastWatched.title}</h1>
            <h2>{lastWatched.episode_last}/{lastWatched.episode}/{lastWatched.episode_count} Episodes</h2>
          </div>
          <button
            onClick={() => goToEpisode(lastWatched.url, lastWatched.episode_last, router, "", "", lastWatched.episode_url)}
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
  );
}
export default View;