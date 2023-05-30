import { ReactNode, useEffect, useRef } from 'react';

import './style.css';

interface WatchEpisodeProps {
  children: ReactNode;
}

const imageStyle = {
  backgroundImage: `url(${'../../anime_save/log-horizon-episode-11681519621.0.mp4'})`,
};
export function WatchEpisode() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoFiles: string[] = [
    'src/anime_save/Stone/video1.mp4',
    'src/anime_save/Stone/video2.mp4',
    'src/anime_save/Stone/video3.mp4'
  ];

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      let currentVideoIndex = 0;

      const playNextVideo = () => {
        const nextVideoIndex = (currentVideoIndex + 1) % videoFiles.length;
        video.src = videoFiles[nextVideoIndex];
        video.load();
        video.play();
        currentVideoIndex = nextVideoIndex;
      };

      video.addEventListener('ended', playNextVideo);

      return () => {
        video.removeEventListener('ended', playNextVideo);
      };
    }
  }, [videoFiles]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.src = videoFiles[0];
      video.load();
      video.play();
    }
  }, [videoFiles]);

  return (
    <div>
      <video ref={videoRef} controls width="640" height="360"></video>
    </div>
  );
};