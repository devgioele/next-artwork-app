import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import useArtworks from "./hooks/artworks";
import Spinner from "./components/Spinner";
import ErrorCard from "./components/ErrorCard";
import PageControls from "./components/PageControls";

export const PAGE_SIZE = 12;

const toPeriod = (start: number, end: number) =>
  start == end ? start : `${start} - ${end}`;

const Home: NextPage = () => {
  const [page, setPage] = useState(1);
  const { artworks, maxPage, isLoading, error } = useArtworks(PAGE_SIZE, page);

  return (
    <div className="flex h-full min-h-screen flex-col items-center justify-center bg-neutral-100">
      <Head>
        <title>Artworks Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-start gap-10 p-4 text-center sm:p-6 md:w-10/12 md:p-10 lg:w-9/12">
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
          {artworks && maxPage && (
            <>
              <PageControls page={page} maxPage={maxPage} setPage={setPage} />
              <div className="-mt-6 columns-1 gap-4 space-y-4 sm:columns-2 sm:gap-6 sm:space-y-6 md:columns-3 lg:gap-10 lg:space-y-10 xl:columns-4">
                {artworks.map((artwork) => (
                  // Apply top margin on first element to achieve height alignment at the top
                  <div
                    key={artwork.id}
                    className="inline-block w-full first:mt-6"
                  >
                    <a className="group flex w-full flex-col items-center gap-5 rounded rounded-md border bg-white p-5 hover:border-artic-red">
                      {artwork.image_url_low ? (
                        <img
                          alt=""
                          className="w-full rounded group-hover:blur-sm"
                          src={artwork.image_url_low}
                        />
                      ) : (
                        <div className="flex aspect-square flex-col items-center justify-center rounded bg-orange-100 p-4 text-lg text-slate-800 group-hover:blur-sm">
                          No preview available
                        </div>
                      )}
                      <div className="flex flex-col items-center gap-2">
                        <p className="font-bold group-hover:text-artic-red">
                          {artwork.title}
                        </p>
                        <p className="">{artwork.artist_titles}</p>
                        {artwork.date_start && artwork.date_end && (
                          <p className="rounded rounded-full bg-yellow-500 px-2 ">
                            {toPeriod(artwork.date_start, artwork.date_end)}
                          </p>
                        )}
                      </div>
                    </a>
                  </div>
                ))}
              </div>
              <PageControls page={page} maxPage={maxPage} setPage={setPage} />
            </>
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
