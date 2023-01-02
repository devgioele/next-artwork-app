import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import {useEffect, useState} from 'react';
import useArtworks from "./hooks/artworks";
import Spinner from "./components/Spinner";
import ErrorCard from "./components/ErrorCard"

export const PAGE_SIZE = 12;

const Home: NextPage = () => {
  const [page, setPage] = useState(1);
  const {artworks, isLoading, error} = useArtworks(PAGE_SIZE, page);
 
  return (
    <div className="flex h-full min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Artworks Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full md:w-9/12 flex-1 flex-col items-center justify-start px-10 py-10 text-center gap-10">
        <h1 className="p-3 text-6xl font-bold">
          <a className="text-black" href="https://www.artic.edu/">
            Art Institute of Chicago
          </a>
        </h1>

        <div className="w-full flex flex-col items-center gap-10">
          <div className="w-10/12 md:w-4/6 border rounded-lg h-10 flex items-stretch gap-2">
            <input className="rounded-l-lg ml-3 flex-1 min-w-0 min-w-fit flex-1 placeholder-shown:text-slate-700 focus:outline-none" placeholder="Search artworks"/>
            <button className="rounded-r-lg flex-none w-[40px] hover:bg-zinc-100 aspect-square flex flex-col justify-center items-center">
              <img className="w-1/2 h-1/2" src="/search.svg" alt="search icon" />
            </button>
          </div>
          {error && <ErrorCard message="Artworks could not be fetched! Check your internet connection"/>}
          {isLoading && <Spinner />}
          {artworks && <div className="grid gap-4 grid-cols-4 grid-rows-3">
            {artworks.map(artwork => 
              (<div className="bg-blue-500" key={artwork.id}>
                {artwork.id}
              </div>))}
          </div>}
        </div>
      </main>

      <footer className="flex w-full items-center justify-center border-t py-4">
        <a
          href="https://devgioele.xyz"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made by Gioele De Vitti
        </a>
      </footer>
    </div>
  );
};

export default Home;
