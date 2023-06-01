"use client"
import { ReactNode, useEffect, useRef } from 'react';
import Layout from "../../components/view/Layout"

import './style.css';

interface WatchEpisodeProps {
  children: ReactNode;
}

const imageStyle = {
  backgroundImage: `url(${'../../anime_save/log-horizon-episode-11681519621.0.mp4'})`,
};
export default function WatchEpisode() {



  return (
    <Layout>
      <div className="watch-episode-container">

      </div>
    </Layout>
    // <div>
    //   <video controls width="640" height="360"></video>
    // </div>
  );
};