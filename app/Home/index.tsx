"use client"
import { ReactNode, useState } from 'react';
import styles from './Home.module.css';
import Layout from '@/components/view/Layout';
import View from './View'

interface HomeProps {
  children: ReactNode;
}

export type AnimeItem = {
  title: string,
  url: string,
  img: string,
  episode: string,
  episode_url: string,
  episode_count: string,
  episode_last: string,
}




function Home() {
  return (
    <Layout>
      <View />
    </Layout>
  );
}
export default Home;