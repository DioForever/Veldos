use reqwest;
use select::document::Document;
use select::predicate::Attr;
use std::process::Command;

pub static mut anime_list: Vec<(String, String, String, String)> = Vec::new();

#[tauri::command]
pub async fn getAnimeInfo(
    url: String,
) -> Vec<(
    String,
    String,
    String,
    String,
    String,
    String,
    String,
    Vec<Vec<(String, String, String)>>,
)> {
    let resp = reqwest::get(&url).await.unwrap();
    let body = resp.text().await.unwrap();

    // Parse the HTML document
    let document = Document::from(body.as_str());
    // println!("{}", body);

    // Select all elements with specific class
    let element_img = document.find(Attr("class", "posteri"));
    let element_title = document.find(Attr("class", "infodes"));
    let element_description = document.find(Attr("class", "desc"));
    // let element_episodes = document.find(Attr("class", "infoepbox"));
    let element_episode_r = document.find(Attr("class", "infovanr"));
    let element_episodes = document.find(Attr("class", "infovan"));
    let element_des2 = document.find(Attr("class", "infodes2"));

    let mut title: String = String::new();
    let mut img: String = String::new();
    let mut description: String = String::new();
    let mut genres: String = String::new();
    let mut status: String = String::new();
    let mut episode_count: String = String::new();
    let mut release_date: String = String::new();
    let mut episodes: Vec<Vec<(String, String, String)>> = vec![];

    for element in element_img {
        img = element.attr("src").unwrap().clone().to_string();
        println!("imageeee {}", img);
        break;
    }
    println!("----------------------------");
    for element in element_title {
        title = element.text();
        println!("titleeee {}", title);
        break;
    }
    println!("----------------------------");

    for element in element_description {
        description = element.text();
        println!("descriptiooon {}", description);
        break;
    }
    println!("----------------------------");
    let mut i = 0;
    for element in element_des2 {
        let genres_copy = element.text();
        if i == 1 {
            let mut genres_list = genres_copy.split("\n").collect::<Vec<&str>>();
            genres_list.retain(|x| *x != "" && *x != " " && *x != ", ");
            let genres_text = genres_list.join("*-*").replace("   ", "");
            let genres_list = genres_text.split("Genres/Tags:").collect::<Vec<&str>>();
            let status_list = genres_list[1].split("Status:").collect::<Vec<&str>>();
            let episodes_list = status_list[1].split("Episodes:").collect::<Vec<&str>>();
            let release_date_list = episodes_list[1].split("Year:").collect::<Vec<&str>>();
            println!(
                "genressss lists {:?}\n  {:?}\n  {:?}\n  {:?} ",
                genres_list, status_list, episodes_list, release_date_list
            );
            genres = status_list[0].replace("*-*", "").replace("*-* ", "");
            status = episodes_list[0].replace("*-*", "");
            episode_count = release_date_list[0].replace("*-*", "");
            release_date = release_date_list[1].replace("*-*", "");

            println!(
                "genressss {} - {} - {} - {} ",
                genres, status, episode_count, release_date
            );
            break;
        }
        i += 1;
    }
    println!("----------------------------");

    // for element in element_episodes {
    //     let text = element.text();
    //     let mut text_vec = text.split("\n").collect::<Vec<&str>>();
    //     text_vec.retain(|x| *x != "" && *x != " " && *x != ", ");
    //     let joined = text_vec.join("*-*")
    //     .replace("  ", "")
    //     .replace("*-**-*", "")
    //     .replace("   *-*", "")
    //     .replace("*-* *-* *-*", "--" )
    //     .replace("*-*   *-*   *-*", "*-*")
    //     .replace("   ", "*-*");
    //     let mut episodes_list = joined.split("*-*").collect::<Vec<&str>>();
    //     for i in 0..episodes_list.len() {
    //         let mut episode: Vec<&str> = episodes_list[i].split("--").collect::<Vec<&str>>();
    //         println!("episode {:?}", episode);
    //         episodes.push(episode);
    //     }
    //     println!("episodes {}", joined);
    // }

    for element in element_episode_r {
        let title = element.attr("title").unwrap().to_string();
        let link = element.attr("href").unwrap().to_string();
        let centerv = element.find(Attr("class", "centerv"));
        let mut year = String::new();
        for element in centerv {
            year = element.text();
        }
        let mut episode_r: Vec<(String, String, String)> = vec![(title, link, year)];
        println!("episode {:?}", episode_r);
        episodes.push(episode_r);
    }
    for element in element_episodes {
        let title = element.attr("title").unwrap().to_string();
        let link = element.attr("href").unwrap().to_string();
        let centerv = element.find(Attr("class", "centerv"));
        let mut year = String::new();
        for element in centerv {
            year = element.text();
        }
        let mut episode: Vec<(String, String, String)> = vec![(title, link, year)];
        println!("episode {:?}", episode);
        episodes.push(episode);
    }
    println!("----------------------------");

    // title: string,
    // pageurl: string,
    // imageurl: string,
    // episode_count: string,
    // episode_total: string,
    // date: string,
    // genres: string,
    // description: string
    // episodes

    return vec![(
        title,
        url,
        img,
        episode_count,
        release_date,
        genres,
        description,
        episodes,
    )];
}
