"use client"
import { useRouter, useSearchParams } from 'next/navigation';
// import './AnimeInfoPage.module.css';
import Layout from "../../components/view/Layout"
import AnimeInfoItem from '@/app/AnimeInfoPage/AnimeInfoItem';




function AnimeInfoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search_url");

  return (
    <Layout>
      <AnimeInfoItem search={search} ></AnimeInfoItem>
    </Layout>



  );
}


export default AnimeInfoPage;
