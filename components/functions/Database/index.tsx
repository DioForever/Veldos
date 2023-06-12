import SQLite from 'tauri-plugin-sqlite-api'
import { AnimeItem } from '../../../app/Home';

// title: "One Piece",
// url: "https://animeheaven.ru/detail/dr-stone-new-world-dub",
// img: "https://static.anmedm.com/media/imagesv2/2023/04/Dr-STONE-NEW-WORLD-Dub.jpg",
// status: "Ongoing",
// episode_count: "7",

export async function initliaze() {
  const db = await SQLite.open('../database.db')

  await db.execute(`
        CREATE TABLE IF NOT EXISTS anime (title TEXT, url TEXT, img TEXT, episode TEXT, episode_url TEXT, episode_count TEXT, episode_last TEXT);
      `)
  await db.execute(`
        CREATE TABLE IF NOT EXISTS last (title TEXT, url TEXT, img TEXT, episode TEXT, episode_url TEXT, episode_count TEXT, episode_last TEXT);
      `)

}

export async function getAnimeList() {
  initliaze();
  const db = await SQLite.open('../database.db');
  const rows = await db.select<Array<{ count: number }>>('SELECT * FROM anime')
  console.log(rows);
  return rows;
}


export async function getAnime(title: string) {
  initliaze();
  const db = await SQLite.open('../database.db')

  const rows = await db.select<Array<{ count: number }>>('SELECT * FROM anime WHERE title = ?', [title])
  console.log("rows" + rows + rows.length);
  if (rows.length == 0) {
    return false;
  } else {
    return true;
  }
}

export async function saveAnime(anime: AnimeItem) {
  initliaze();
  const db = await SQLite.open('../database.db')

  await db.execute('INSERT INTO anime VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)', [anime.title, anime.url, anime.img, anime.episode, anime.episode_url, anime.episode_count, anime.episode_last])
  // console.log('saved', [anime.title, anime.url, anime.img, anime.episode, anime.episode_url, anime.episode_count, anime.episode_last]);

}

export async function removeAnime(title: string) {
  initliaze();
  const db = await SQLite.open('../database.db')
  console.log(title);

  await db.execute('DELETE FROM anime WHERE title = ?', [title])
  console.log('deleted');
}


export async function getLast() {
  initliaze();
  const db = await SQLite.open('../database.db')

  const rows = await db.select<Array<{ count: number }>>('SELECT * FROM last')
  return rows;
}

export async function saveLast(anime: AnimeItem) {
  initliaze();
  const db = await SQLite.open('../database.db')
  await db.execute('DELETE FROM last')
  await db.execute('INSERT INTO last VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)', [anime.title, anime.url, anime.img, anime.episode, anime.episode_url, anime.episode_count, anime.episode_last])
  // console.log('saved', [anime.title, anime.url, anime.img, anime.episode, anime.episode_url, anime.episode_count, anime.episode_last]);

}


// export async function saveLast(anime: AnimeItem) {
//   initliaze();
//   const db = await SQLite.open('../database.db');
//   await db.execute('DELETE FROM last');
//   await db.execute('INSERT INTO anime (?1, ?2, ?3, ?4, ?5, ?6, ?7) ON DUPLICATE KEY UPDATE', [anime.title, anime.url, anime.img, anime.episode, anime.episode_url, anime.episode_count, anime.episode_last]);
//   // await db.execute('INSERT INTO anime (?1, ?2, ?3, ?4, ?5, ?6) ON DUPLICATE KEY UPDATE', [1, 'new_title', 'new_url', 'new_image_url', 'new_episodes', 'new_episode_count', 'new_episode_last'])
//   console.log('saved last');
// }

// export async function getLast() {
//   initliaze();
//   const db = await SQLite.open('../database.db')

//   const rows = await db.select<Array<{ count: number }>>('SELECT * FROM last')
//   console.log(rows);
//   return rows;
// }
