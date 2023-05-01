import { invoke } from "@tauri-apps/api/tauri";
import { useState } from "react";
import { Button } from "react-bootstrap";
import search_logo from '../assets/Search.png';
import profile_logo from '../assets/profilepicture.png';
import "./SearchPage.css";

function Search() {
  const [name, setName] = useState("");

  async function search(){
    console.log("name: " + name);
    const res = await invoke("search_anime", {title: name});
    console.log(res);
  }


  return (
      <div>
        <div className="navbar">
          <div className="menu">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="search">
            <form action="" className="search-bar" onSubmit={search}>
              <input onChange={(e) => setName(e.target.value)} type="search" name="q" id="searchInput" autoComplete="off" placeholder="Search..." />
              <Button onMouseDown={search}><img src={search_logo}/></Button>
            </form>
          </div>
          <div className="pfp"><img src={profile_logo} alt="" /></div>
        </div>
        <h1>HAHAHAHAH</h1>

        <div>

        </div>
      </div>
  );
}

export default Search;
