import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import useArtworks from "./hooks/artworks";
import Spinner from "./components/Spinner";
import ErrorCard from "./components/ErrorCard";

export const PAGE_SIZE = 12;

const toPeriod = (start: number, end: number) =>
  start == end ? start : `${start} - ${end}`;

const Home: NextPage = () => {
  const [page, setPage] = useState(1);
  const { artworks, isLoading, error } = useArtworks(PAGE_SIZE, page);

  return (
    <div className="flex h-full min-h-screen flex-col items-center justify-center bg-neutral-100">
      <Head>
        <title>Artworks Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-start gap-10 px-10 py-10 text-center md:w-9/12">
        <h1 className="p-3 text-6xl font-bold">
          <a className="text-black" href="https://www.artic.edu/">
            Art Institute of Chicago
          </a>
        </h1>

        <div className="flex w-full flex-col items-center gap-10">
          <div className="flex h-10 w-10/12 items-stretch gap-2 rounded-lg border bg-white md:w-4/6">
            <input
              className="ml-3 min-w-0 min-w-fit flex-1 flex-1 rounded-l-lg placeholder-shown:text-slate-700 focus:outline-none"
              placeholder="Search artworks"
            />
            <button className="flex aspect-square w-[40px] flex-none flex-col items-center justify-center rounded-r-lg hover:bg-zinc-100">
              <img
                className="h-1/2 w-1/2"
                src="/search.svg"
                alt="search icon"
              />
            </button>
          </div>
          {error && (
            <ErrorCard message="Artworks could not be fetched! Check your internet connection" />
          )}
          {isLoading && <Spinner />}
          {artworks && (
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
              {artworks.map((artwork) => (
                <a
                  className="justify group flex flex-col items-center gap-5 rounded rounded-md border bg-white p-5"
                  key={artwork.id}
                >
                  <img
                    className="group-hover:blur-sm"
                    src={artwork.image_url_low}
                  />
                  <div className="flex flex-1 flex-col items-center justify-center gap-2">
                    <p className="font-bold group-hover:text-artic-red">
                      {artwork.title}
                    </p>
                    <p className="">{artwork.artist_titles}</p>
                    {artwork.date_start && artwork.date_end && (
                      <p className="rounded rounded-full bg-orange-200 px-2 ">
                        {toPeriod(artwork.date_start, artwork.date_end)}
                      </p>
                    )}
                  </div>
                </a>
              ))}
            </div>
          )}
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
