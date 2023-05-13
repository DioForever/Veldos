use dotenv::dotenv;

struct AnimeItem {
    title: String,
    link: String,
    image_link: String,
    release_date: String,
}

pub static mut anime_list: Vec<(String, String, String, String)> = Vec::new();


pub fn add_anime(mut arg: Vec<(String, String, String, String)>) {
    unsafe { anime_list.append(&mut arg) };
}