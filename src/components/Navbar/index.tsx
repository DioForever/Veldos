import { ReactNode, useRef, useState } from 'react';
import {HomeIcon, Bars3Icon, MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import { ControlledMenu, MenuItem, useHover, useMenuState } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import "./style.css";
import { AnimeSearch } from '../../App';
import { invoke } from "@tauri-apps/api/tauri";
import { NavigateFunction, useNavigate } from 'react-router-dom';




export async function search(name: string, setSearchResponse: React.Dispatch<React.SetStateAction<AnimeSearch[]>>) {
  console.log("name: " + name);
  const res: string[] = await invoke("search_anime", { title: name });
  console.log(res);
  setSearchResponse(res.map((anime) => {
    return {
      title: anime[0],
      url: anime[1],
      image_url: anime[2],
      episodes: anime[3],
      time: anime[4],
    }
  }));

}

const handleKeyDown = (e: any, setSearchResponse: React.Dispatch<React.SetStateAction<AnimeSearch[]>>, navigate: NavigateFunction) => {
  if (e.key === 'Enter') {
    search(e.target.value, setSearchResponse);
    navigate('/search');
  }
}

interface NavbarProps {
  searchResponse: AnimeSearch[];
  setSearchResponse: React.Dispatch<React.SetStateAction<AnimeSearch[]>>;
}

function Navbar({searchResponse, setSearchResponse}: NavbarProps) {
  const [searchWord, setsearchWord] = useState<string>("");
  const ref = useRef(null);
  const [menuState, toggle] = useMenuState({ transition: true });
  const { anchorProps, hoverProps } = useHover(menuState.state, toggle);
  const navigate = useNavigate();
  

  return (
    <>
        <nav className='navbar'>
          <div className='main'><HomeIcon/></div>

          <div className="Input">
            <div>
              <input type="text" placeholder="Search..."  onKeyDown={(e) => {handleKeyDown(e, setSearchResponse, navigate);}} onChange={(e) => {setsearchWord(e.target.value); console.log(searchWord);}} 
              // style={ (icon != undefined) ? {padding: '6.5px 2em 6.5px 10px'} : {}}
              />
              <div className="Icon"><MagnifyingGlassIcon/></div>
            </div>
          </div>

          <div className='menu' ref={ref} {...anchorProps}><Bars3Icon/></div>
        </nav>
        <div className='navSpace'>Damn, you found an Easter Egg</div>


        <ControlledMenu
        {...hoverProps}
        {...menuState}
        anchorRef={ref}
        offsetX={-60
        }
        offsetY={10
        }
        onClose={() => toggle(false)}
      >
        <MenuItem>Settings</MenuItem>
        <MenuItem>Copy</MenuItem>
      </ControlledMenu>
    </>
  );
}

export default Navbar;

function browserHistory(arg0: string) {
  throw new Error('Function not implemented.');
}
