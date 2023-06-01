"use client"
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { AnimeSearch } from '../../app/page';
// import { HeartIcon as HeartFEmpty } from '@heroicons/react/24/outline';
// import { HeartIcon as HeartFull } from '@heroicons/react/20/solid';
import './style.css';
// import { NavigateFunction, useNavigate } from 'react-router-dom';
import { invoke } from '@tauri-apps/api';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Layout from '@/components/view/Layout';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import SearchItems from './SearchItems';





export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search_url");



  return (
    <Layout>
      <SearchItems search={search}></SearchItems>

    </Layout >
  );
}
