"use client"
import { ReactNode, useRef, useState } from 'react';
// import { HomeIcon, Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ControlledMenu, MenuItem, useHover, useMenuState } from '@szhsin/react-menu';
import HomeIcon from 'heroicons/24/outline/home.svg';
import Bars3Icon from 'heroicons/24/outline/bars-3.svg';
import MagnifyingGlassIcon from 'heroicons/24/outline/magnifying-glass.svg';

import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import styles from "./Navbar.module.css";
import { AnimeSearch } from '../../../app/page';
import { invoke } from "@tauri-apps/api/tauri";
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { NavigateFunction, useNavigate } from 'react-router-dom';




// export async function search(name: string) {
//   console.log("name: " + name);
//   setSearchResponse([]);
//   const res: string[] = await invoke("search_anime", { title: name });
//   console.log(res);
//   setSearchResponse(res.map((anime) => {
//     return {
//       title: anime[0],
//       url: anime[1],
//       image_url: anime[2],
//       episodes: anime[3],
//       time: anime[4],
//     }
//   }));

// }

const handleKeyDown = (e: any, router: AppRouterInstance) => {
  if (e.key === 'Enter') {
    // search(e.target.value);
    router.push("/Search?search_url=" + e.target.value);
  }
}

interface NavbarProps {
  // searchResponse: AnimeSearch[];
  // setSearchResponse: React.Dispatch<React.SetStateAction<AnimeSearch[]>>;
}

function Navbar() {
  const [searchWord, setsearchWord] = useState<string>("");
  const ref = useRef(null);
  const [menuState, toggle] = useMenuState({ transition: true });
  const { anchorProps, hoverProps } = useHover(menuState.state, toggle);
  const router = useRouter();



  return (
    <>
      <nav className={styles.navbar}>
        <Link href={'/'}>
          <div className={styles.main}>
            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg> */}


          </div>
        </Link>

        <div className={styles.Input}>
          <div>
            <input type="text" placeholder="Search..." onKeyDown={(e) => { handleKeyDown(e, router); }} onChange={(e) => { setsearchWord(e.target.value); console.log(searchWord); }}
            // style={ (icon != undefined) ? {padding: '6.5px 2em 6.5px 10px'} : {}}
            />
            <div className={styles.Icon}>
              {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg> */}

            </div>
          </div>
        </div>

        <div className='menu' ref={ref} {...anchorProps}>
          {/* <Bars3Icon /> */}
        </div>
      </nav>


      {/* <ControlledMenu
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
      </ControlledMenu> */}
    </>
  );
}

export default Navbar;

function browserHistory(arg0: string) {
  throw new Error('Function not implemented.');
}
