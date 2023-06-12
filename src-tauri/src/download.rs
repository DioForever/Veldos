use std::fs;
use std::fs::File;
use std::io::Write;
use std::sync::Arc;
use std::thread::{self};
use std::time;

use m3u8_rs::parse_playlist_res;
use m3u8_rs::Playlist;
use reqwest;
use std::io::Read;
use std::process::Command;

use headless_chrome::protocol::cdp::Fetch::events::RequestPausedEvent;

use headless_chrome::browser::tab::RequestPausedDecision;
use headless_chrome::browser::transport::{SessionId, Transport};
use headless_chrome::Browser;
use reqwest::get;

#[tauri::command]
pub fn check_episode(title: String, episode: String) -> bool {
    let path = format!("../public/anime/{}/{}.mp4", title, episode);
    if fs::metadata(&path).is_ok() {
        return true;
    } else {
        return false;
    }
}

#[tauri::command]
pub async fn download_episode(url: String, title: &str, episode: String) -> Result<(), ()> {
    // let url = "https://www.reddit.com/r/rust/comments/glep7w/rust_needs_a_viable_puppeteer_headless_chrome/";
    // let res = request_interceptor_function(url);
    let playlist_url = get_playlist_by_url(url).await;
    println!("playlist url {:?}", playlist_url);
    let download = download_by_playlist_url(&playlist_url, title, &episode).await;
    println!("download {:?}", download);
    let convert = ts_to_mp4(title.to_string(), episode.to_string());
    println!("convert {:?}", convert);
    Ok(())
}

async fn get_playlist_by_url(url: String) -> String {
    println!("get_playlist_by_url {:?}", url);
    let browser = Browser::default().unwrap();

    let tab = browser.new_tab().unwrap();

    tab.enable_fetch(None, None);

    tab.enable_request_interception(Arc::new(
        |transport: Arc<Transport>, session_id: SessionId, intercepted: RequestPausedEvent| {
            println!("{:?}", intercepted.params.request.url);
            if intercepted.params.request.url.ends_with(".m3u8")
                && intercepted.params.request.url.contains("index-")
            {
                println!("Found {:?}", intercepted.params.request.url);
                let data = intercepted.params.request.url;
                if fs::metadata("url_file.txt").is_ok() {
                    fs::remove_file("url_file.txt").expect("Unable to remove file");
                }
                let mut f = File::create("url_file.txt").expect("Unable to create file");
                f.write_all(data.as_bytes()).expect("Unable to write data");
            }
            RequestPausedDecision::Continue(None)
        },
    ))
    .unwrap();

    tab.enable_debugger().unwrap();

    tab.navigate_to(&format!("{}", url))
        .unwrap()
        .wait_until_navigated()
        .unwrap();
    let mut found = false;
    let mut url = "".to_string();
    while found == false {
        let data = "Some data!";
        if fs::metadata("url_file.txt").is_ok() {
            let mut f = File::open("url_file.txt").expect("Unable to open file");
            f.read_to_string(&mut url).expect("Unable to read string");
            fs::remove_file("url_file.txt").expect("Unable to remove file");
            if url != "" {
                if url.contains("index-") {
                    found = true;
                }
            }
        }

        thread::sleep(time::Duration::from_secs(1));
    }
    println!("url {:?}", url);
    return url;
}

async fn download_by_playlist_url(url: &str, title: &str, episode: &String) -> Result<(), ()> {
    //  Get data by requesting to the web location of the playlist
    let response = get(url).await.unwrap();
    let bytes = response.bytes().await.unwrap();

    // Parse to get playlist data
    let parsed = parse_playlist_res(&bytes);

    // println!("parsed {:?}", parsed);
    match parsed {
        Ok(Playlist::MasterPlaylist(pl)) => {
            println!("Master playlist:");
        }
        Ok(Playlist::MediaPlaylist(pl)) => {
            println!("Media playlist:");

            let path: String = format!("../download/{}/{}.ts", title, episode);
            let folder_path_download: String = format!("../download/");

            if !(fs::metadata(&folder_path_download).is_ok()) {
                fs::create_dir("../download").expect("Unable to create directory");
            }

            let folder_path: String = format!("../download/{}/", title);
            if !(fs::metadata(&folder_path).is_ok()) {
                fs::create_dir(folder_path).expect("Unable to create directory");
            }
            let mut f = File::create(&path).expect("Unable to create file");

            for segment in pl.segments {
                // println!("{:?}", segment);
                let url_end = segment.uri;
                let url_start = &url[..url.len() - 16];
                let url_complete = format!("{}{}", url_start, url_end);
                let response = get(&url_complete).await.unwrap().bytes().await.unwrap();
                f.write_all(&response).expect("Unable to write data");
                // println!("url_complete {:?}", url_complete);
                // break;
            }
        }
        Err(e) => println!("Error: {:?}", e),
    }

    // Lets create file and go through all the segments download them and save them

    // f.write_all(data.as_bytes()).expect("Unable to write data");

    Ok(())
}

fn ts_to_mp4(title: String, episode: String) -> bool {
    // Set the paths to the input and output files
    let folder_path: String = format!("../public/anime/{}/", title);
    if !(fs::metadata(&folder_path).is_ok()) {
        fs::create_dir(folder_path).expect("Unable to create directory");
    }

    let input_file = format!("../download/{}/{}.ts", title, episode);
    let output_file = format!("../public/anime/{}/{}.mp4", title, episode);

    // Create the FFmpeg command
    let ffmpeg_command = Command::new("src/ffmpeg.exe")
        .arg("-hwaccel") // Specify hardware acceleration
        .arg("auto") // Auto select hardware acceleration
        .arg("-i") // Specify input file
        .arg(input_file) // Input file path
        .arg("-c:v") // Specify video codec
        .arg("h264_nvenc") // Use h264_nvenc codec for hardware acceleration
        .arg("-preset") // Specify encoding preset
        .arg("fast") // Use the fast preset
        .arg(output_file) // Output file path
        .output();

    // Execute the FFmpeg command
    match ffmpeg_command {
        Ok(output) => {
            if output.status.success() {
                println!("Conversion completed successfully!");
                return true;
            } else {
                let error_message = String::from_utf8_lossy(&output.stderr);
                println!("Error occurred during conversion: {}", error_message);
                return false;
            }
        }
        Err(e) => {
            println!("Failed to execute FFmpeg command: {}", e);
            return false;
        }
    }
}
