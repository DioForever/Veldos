
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod gogoanime;
mod search;
mod animeheaven;
use std::result;

use reqwest;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, animeheaven::get_master_m3u8, animeheaven::search_anime])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}


// #[tauri::command]
// async fn search_anime(mut title: String) {
//     // we will create a list of all anime we found
//     let mut anime = Vec::new();

//     let mut count = 0;
//     let finished = false;
//     while finished == false{
//         //we need to replace spaces with - for search to be possible
//         title = title.trim().replace(" ", "-");
//         //now lets get the page its on count/20 +1, cuz we get 0 but we start with page 1 upon looping
//         let page = count/20+1;

//         title += &format!("&page={}", page);
//         let url = format!("https://animeheaven.ru/search?q={}", title);
//         // lets get the response of the gogoanime search
//         let resp = reqwest::get(&url).await.unwrap();
//         //println!("response: {:#?}", resp.status());
//         let body = resp.text().await.unwrap();
//         //println!("response text: {:#?}", body);
//         // lets make results a vector of found animes
//         let results = body.split("class=\"iepbox\"").nth(1).unwrap();
//         println!("{}", results);

//                                 // .split("</ul>").nth(0).unwrap()
//                                 // .split("</li>").collect::<Vec<&str>>();
//         // lets go through the results and take the title and link and print it along with result

//         count += results.len()-1;
//         if results.len()-1 != 20 {return anime;}
//     }
    
//     //println!("Found {} results", count);

// }

