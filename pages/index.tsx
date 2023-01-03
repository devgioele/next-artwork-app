import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import useArtworks from "./hooks/artworks";
import Spinner from "./components/Spinner";
import ErrorCard from "./components/ErrorCard";
import PageControls from "./components/PageControls";
import SearchBar from "./components/SearchBar";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";

export const PAGE_SIZE = 12;

const List: NextPage = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState<string | undefined>();
  const { artworks, maxPage, isLoading, error } = useArtworks(
    PAGE_SIZE,
    page,
    query
  );

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
          <SearchBar onSubmit={setQuery} />
          {error && (
            <ErrorCard message="Artworks could not be fetched! Check your internet connection" />
          )}
          {isLoading && <Spinner />}
          {artworks && maxPage && (
            <>
              <PageControls page={page} maxPage={maxPage} setPage={setPage} />
              <Gallery artworks={artworks} />
              <PageControls page={page} maxPage={maxPage} setPage={setPage} />
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default List;
