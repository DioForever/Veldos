use std::io;
use reqwest;
use tokio;

#[tauri::command]
async fn search_anime(mut title: String) -> Vec<(String, String, String, String)> {
    // we will create a list of all anime we found
    let mut anime = Vec::new();

    let mut count = 0;
    //lets get the title for search
    // io::stdin().read_line(&mut title)
    // .expect("Failed to read line");
    let finished = false;
    while finished == false{
        //we need to replace spaces with - for search to be possible
        title = title.trim().replace(" ", "-");
        //now lets get the page its on count/20 +1, cuz we get 0 but we start with page 1 upon looping
        let page = count/20+1;

        title += &format!("&page={}", page);
        let url = format!("https://www3.gogoanimes.fi/search.html?keyword={}", title);
        // lets get the response of the gogoanime search
        let resp = reqwest::get(&url).await.unwrap();
        //println!("response: {:#?}", resp.status());
        let body = resp.text().await.unwrap();
        //println!("response text: {:#?}", body);
        // lets make results a vector of found animes
        let results = body.split("class=\"items\"").nth(1).unwrap()
                                .split("</ul>").nth(0).unwrap()
                                .split("</li>").collect::<Vec<&str>>();
        // lets go through the results and take the title and link and print it along with result
        for index in 0..(results.len()-1) {
            let result = results.get(index).unwrap();
            //println!("{}", result);
            let title: String = result.split("title=\"").nth(1).unwrap()
                                .split("\"").nth(0).unwrap().to_string().replace("\t", "");
            let link: String = result.split("href=\"").nth(1).unwrap()
                                .split("\"").nth(0).unwrap().to_string().replace("\t", "");
            let image_link: String = result.split("src=\"").nth(1).unwrap()
                                .split("\"").nth(0).unwrap().to_string().replace("\t", "");
            let release_date: String = result.split("class=\"released\">").nth(1).unwrap()
                                .split("</p>").nth(0).unwrap().to_string().replace("\t", "");
            println!("{} - {} - {} - {}", title, link, image_link, release_date);
            anime.push((title, link, image_link, release_date));
        } 
        count += results.len()-1;
        if results.len()-1 != 20 {return anime;}
    }
    anime.push(("title".to_string(), "line".to_string(), "image".to_string(), "release".to_string()));
    return anime;
    
    //println!("Found {} results", count);

}


// #[tokio::main]
// pub async fn download() -> Result<(), Box<dyn std::error::Error>>  {
//     // Specify the URL of the video to be downloaded
//     let url = "https://anihdplay.com/streaming.php?id=Nzc=&title=Log+Horizon+Episode+1";

//     // Create a Reqwest client
//     let client = reqwest::Client::new();

//     // Send a GET request to the URL
//     let mut response = client.get(url).send().await?;

//     // Open a file to write the downloaded video to
//     let mut file = File::create("Log Horizon Episode 1.mp4")?;

//     // Get the response body as a Bytes struct
//     let mut bytes = response.bytes().await?;

//     // Write the bytes to the file
//     copy(&mut bytes.as_ref(), &mut file)?;

//     Ok(())
    
// }