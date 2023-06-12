import { ReactNode, useEffect, useRef, useState } from 'react';
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





  return (
    <Layout>
      <EpisodeView></EpisodeView>
    </Layout>



  );
};