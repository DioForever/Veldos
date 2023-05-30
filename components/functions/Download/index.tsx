import { ReactNode } from 'react';
const puppeteer = require('puppeteer');
import axios from 'axios';
import HLS from 'hls-parser';
import fs from 'fs-extra';
import path from 'path';

interface DownloadProps {
  url: string;
}

export function Download({ url }: DownloadProps) {

  async function getSegmentUrl(url: string) {
    const response = await axios.get(url);
    const playlist = HLS.parse(response.data);

    let playlist_url;
    let segment;

    if (playlist.isMasterPlaylist) {
      playlist_url = playlist.variants[0].uri;
      segment = playlist.variants[0].uri;
    } else {
      playlist_url = url;
      segment = playlist.segments[0].uri;
    }

    let slice = 0;

    for (let i = 0; i < segment.length; i++) {
      const m = segment.length - i - 1;
      if (segment[m] === '/') {
        segment = segment.slice(0, -slice);
        break;
      }
      slice += 1;
    }

    return [playlist_url, segment];
  }

  interface MediaSegment {
    uri: string;
    duration: number;
  }

  interface Playlist {
    segments: MediaSegment[];
  }

  async function loadPlaylistData(playlistUrl: string) {
    const response = await fetch(playlistUrl);
    const playlistText = await response.text();

    const playlist: Playlist = { segments: [] };
    const segmentRegex = /#EXTINF:(\d+(?:\.\d+)?),\n(.+)/g;

    let match;
    while ((match = segmentRegex.exec(playlistText)) !== null) {
      const duration = parseFloat(match[1]);
      const uri = match[2];

      playlist.segments.push({ uri, duration });
    }

    // Print the playlist data
    // console.log(playlist);
    return playlist;
  }

  async function downloadAnime() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    let req_url = '';

    // Intercept the desired network request
    page.on('request', async (request: any) => {
      // console.log('Request URL:', request.url());
      if (request.url().endsWith('.m3u8')) {
        console.log('Request URL:', request.url());
        req_url = request.url();
      }
      if (req_url !== '') {
        const res = await getSegmentUrl(req_url);
        console.log(res);
        const data = await loadPlaylistData(res[0]);
        const title = 'The Ancient Magus Bride Season 2';
        const episode = 'Episode 1';
        const filePath = path.join('', `${title} ${episode}.ts`);
        console.log(filePath);
        for (const d in data.segments) {
          console.log(data.segments[d].uri);
          const url = res[1] + data.segments[d].uri;
          console.log(url);
          const response = await axios.get(url, { responseType: 'arraybuffer' });
          await fs.appendFile(filePath, response.data);
        }
        console.log('done');
        // console.log(data[0]);
      }
      request.continue(); // Continue with the request
    });

    await page.goto('https://animeheaven.ru/watch/the-ancient-magus-bride-season-2-dub?ep=183936');
    await page.screenshot({ path: 'example.png' });

    await browser.close();
  }

  const convertTStoMP4 = (pathTo: any, pathOut: any) => {
    const tsFilePath = pathTo;
    const mp4FilePath = pathOut;

  };

  return (
    <>
      
    </>
  );
}

  // (async () => {
  //   const browser = await puppeteer.launch();
  //   const page = await browser.newPage();
  //   await page.setRequestInterception(true);
  //   let req_url = '';

  //   // Intercept the desired network request
  //   page.on('request', (request: any) => {
  //     // console.log('Request URL:', request.url());
  //     if (request.url().endsWith('.m3u8')) {
  //       console.log('Request URL:', request.url());
  //       req_url = request.url();
  //     }
  //     if (req_url != '') {
  //       getSegmentUrl(req_url).then(async (res) => {
  //         console.log(res);
  //         const data: any = await loadPlaylistData(res[0]);
  //         const title = 'The Ancient Magus Bride Season 2';
  //         const episode = 'Episode 1';
  //         const filePath = path.join("", `${title} ${episode}.ts`);
  //         console.log(filePath);
  //         for (const d in data.segments) {
  //           console.log(data.segments[d].uri);
  //           const url = res[1] + (data.segments[d].uri);
  //           console.log(url);
  //           // const response = await axios.get(url, { responseType: 'arraybuffer' });
  //           // await fs.appendFile(filePath, response.data);

  //         }
  //         // convertTStoMP4(filePath, path.join("", `${title} ${episode}`));
  //         console.log('done');
  //         // console.log(data[0]);
  //       });
  //     }
  //     request.continue(); // Continue with the request
  //   });
  //   await page.goto('https://animeheaven.ru/watch/the-ancient-magus-bride-season-2-dub?ep=183936');
  //   await page.screenshot({ path: 'example.png' });

  //   await browser.close();
  // })();
