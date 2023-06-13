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
import TengokuWhite from 'components/functions/Navbar/TengokuWhite.png';
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
            <img src={TengokuWhite.src} alt="Tengoku" className={styles.logo} />
          </div>
        </Link>

        <div className={styles.Input}>
          <div>
            <input type="text" placeholder="Search..." onKeyDown={(e) => { handleKeyDown(e, router); }} onChange={(e) => { setsearchWord(e.target.value); console.log(searchWord); }}
            />
            <div className={styles.Icon}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clip-rule="evenodd" />
              </svg>

            </div>
          </div>
        </div>

        <div className={styles.menu} ref={ref} {...anchorProps}>
          {/* <Bars3Icon /> */}
        </div>
      </nav>


    </>
  );
}

export default Navbar;
