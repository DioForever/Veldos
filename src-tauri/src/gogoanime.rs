// #[tauri::command]
// async fn search_anime(mut title: String) -> Vec<(String, String, String, String)> {
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

//                                 // .split("</ul>").nth(0).unwrap()
//                                 // .split("</li>").collect::<Vec<&str>>();
//         // lets go through the results and take the title and link and print it along with result
        
//         for index in 0..(results.len()-1) {
//             let result = results.get(index).unwrap();
//             //println!("{}", result);
//             let title: String = result.split("title=\"").nth(1).unwrap()
//                                 .split("\"").nth(0).unwrap().to_string().replace("\t", "");
//             let link: String = result.split("href=\"").nth(1).unwrap()
//                                 .split("\"").nth(0).unwrap().to_string().replace("\t", "");
//             let image_link: String = result.split("src=\"").nth(1).unwrap()
//                                 .split("\"").nth(0).unwrap().to_string().replace("\t", "");
//             let release_date: String = result.split("class=\"released\">").nth(1).unwrap()
//                                 .split("</p>").nth(0).unwrap().to_string().replace("\t", "");
//             println!("{} - {} - {} - {}", title, link, image_link, release_date);
//             anime.push((title, link, image_link, release_date));
//         } 
//         count += results.len()-1;
//         if results.len()-1 != 20 {return anime;}
//     }
//     anime.push(("title".to_string(), "line".to_string(), "image".to_string(), "release".to_string()));
//     return anime;
    
//     //println!("Found {} results", count);

// }
