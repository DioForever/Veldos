import Image from 'next/image'


export type AnimeSearch = {
  title: string;
  url: string;
  image_url: string;
  episodes: string;
  time: string;
}
// const [title, pageurl, imageurl, episode_count, date]
// return vec![(title, url ,img, episode_count, release_date, genres, description, episodes)];
export type AnimeInfo = {
  title: string;
  pageurl: string;
  imageurl: string;
  episode_count: string;
  date: string;
  genres: string;
  description: string;
  episodes: any;
}



export default function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}
