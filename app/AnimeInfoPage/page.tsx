// import './AnimeInfoPage.module.css';
import Layout from "../../components/view/Layout"
import AnimeInfoItem from '@/app/AnimeInfoPage/AnimeInfoItem';
import styles from './AnimeInfoPage.module.css';
import { useEffect, useState } from 'react';
import { getSearchUrl } from "@/components/functions/Database";





async function AnimeInfoPage() {
  return (
    <Layout>
      <AnimeInfoItem ></AnimeInfoItem>
    </Layout>



  );
}



export default AnimeInfoPage;
