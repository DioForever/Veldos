use dotenv::dotenv;

struct AnimeItem {
    title: String,
    link: String,
    image_link: String,
    release_date: String,
}

pub static mut search_list: Vec<(String, String, String, String)> = Vec::new();

pub fn set_search_list(mut arg: Vec<(String, String, String, String)>) {
    anime_list = arg;
}

pub fn get_search_list() -> Vec<(String, String, String, String)> {
    return anime_list.clone();
}

pub fn set_anime_info(
    mut arg: Vec<(
        String,
        String,
        String,
        String,
        String,
        String,
        String,
        Vec<Vec<(String, String, String)>>,
    )>,
) {
    anime_info = arg;
}

pub fn get_anime_info() -> Vec<(
    String,
    String,
    String,
    String,
    String,
    String,
    String,
    Vec<Vec<(String, String, String)>>,
)> {
    return anime_info.clone();
}
