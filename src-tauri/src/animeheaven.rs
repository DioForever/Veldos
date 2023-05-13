use std::process::Command;
use reqwest;
use select::document::Document;
use select::predicate::{Attr};
use selenium_rs::element;

#[tauri::command]
pub fn get_master_m3u8() {
    let output = Command::new("../src-tauri/dist/pyveldos.exe")
        .arg("get_master_m3u8s")
        .arg("https://animeheaven.ru/watch/dr-stone-new-world-dub?ep=183935")
        .output()
        .expect("failed to execute process");

    let stdout = String::from_utf8_lossy(&output.stdout);
    let stderr = String::from_utf8_lossy(&output.stderr);

    // println!("stdout: {}", stdout);
    // println!("stderr: {}", stderr);
}


#[tauri::command]
pub async fn search_anime(mut title: String) -> Vec<(String, String, String, String, String)> {
    // we will create a list of all anime we found

    let count = 0;
    let mut finished = false;
    let mut anime_list: Vec<(String, String, String, String, String)> = vec![];
    let mut page = count/20+1;

    while finished == false{
        //we need to replace spaces with - for search to be possible
        title = title.trim().replace(" ", "+");
        //now lets get the page its on count/20 +1, cuz we get 0 but we start with page 1 upon looping

        title += &format!("&page={}", page);
        let url = format!("https://animeheaven.ru/search?q={}", title);
        let resp = reqwest::get(&url).await.unwrap();
        let body = resp.text().await.unwrap();


        // Parse the HTML document
        let document = Document::from(body.as_str());
        // println!("{}", body);

        // Select all elements with specific class
        let elements_cona = document.find(Attr("class", "cona"));
        let element_an_thum = document.find(Attr("class", "coveri hd"));
        let elementbox = document.find(Attr("class", "iep"));


        // Iterate over the selected elements and save the data
        let mut title: Vec<String> = vec![];
        let mut url: Vec<String> = vec![];
        let mut img: Vec<String> = vec![];
        let mut ep: Vec<String> = vec![];
        let mut time: Vec<String> = vec![];

        for element in elementbox {
            let element_list = element.text().replace("\t", "").replace("  ", "");
            let mut item_list = element_list.split("\n").collect::<Vec<&str>>();
            item_list.retain(|x| *x != "" && *x != " ");
            // println!("element_list {:?}",item_list);

            ep.push(item_list[1].trim().to_string());
            time.push(item_list[2].trim().to_string());
            title.push(item_list[3].trim().to_string());
            
        }

        let mut i = 0;
        for element in elements_cona {
            i += 1;
            if i%2 != 0 {continue;}
            // println!("text {} {}",element.text(), element.attr("href").unwrap());
            // title.push(element.text());
            url.push(element.attr("href").unwrap().to_string());
        }
        // title = elements_cona.enumerate().filter_map(|(i, eleme)| {
        //     if i % 2 == 0 {
        //         Some(eleme.text().trim().to_string())
        //     } else {
        //         None
        //     }
        // }).collect();
        // url = elements_cona.enumerate().filter_map(|(i, eleme)| {
        //     if i % 2 == 0 {
        //         Some(eleme.attr("href").unwrap().to_string())
        //     } else {
        //         None
        //     }
        // }).collect();
        // // println!("------------------");
        let mut u = 0;
        for element in element_an_thum {
            u += 1;
            // println!("img {}",element.attr("src").unwrap());
            img.push(element.attr("src").unwrap().to_string());
            if i/2==u {break;}
        }

        // println!("len {}",title.len());
        for i in 0..(title.len()) {
            // println!("{}", i);
            // println!("{} {} {} {} {}", title[i].to_string(), url[i].to_string(), img[i].to_string(),
            // ep[i].to_string(), time[i].to_string());
            let _an: (&str, String, String, String, String, String) = ("{} {} {} {} {}", title[i].to_string(), url[i].to_string(), img[i].to_string(),
             ep[i].to_string(), time[i].to_string());
             anime_list.push((title[i].to_string(), url[i].to_string(), img[i].to_string(),ep[i].to_string(), time[i].to_string()));
        }


        
        if title.len()%20 != 0 {finished = true;}
        page += 1;
    }
    return anime_list;

}