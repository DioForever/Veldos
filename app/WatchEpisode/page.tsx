"use client"
import { ReactNode, useEffect, useRef } from 'react';
import Layout from "../../components/view/Layout"
import EpisodeView from "./EpisodeView"
import './WatchEpisode.module.css';
import { useRouter, useSearchParams } from 'next/navigation';



interface WatchEpisodeProps {
  children: ReactNode;
}

const imageStyle = {
  backgroundImage: `url(${'../../anime_save/log-horizon-episode-11681519621.0.mp4'})`,
};

export default function WatchEpisode() {
  const searchParams = useSearchParams();
  const search_url = searchParams.get("search_url");
  const episode_url = searchParams.get("episode_url");
  // const episode_url = "";
  console.log("search_url: " + search_url);
  console.log("episode_url: " + episode_url);

  return (
    <Layout>
      <EpisodeView search_url={search_url} episode_url={episode_url}></EpisodeView>
    </Layout>



  );
};