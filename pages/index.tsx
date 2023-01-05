import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Spinner from "components/Spinner";
import ErrorCard from "components/ErrorCard";
import PageControls from "components/PageControls";
import SearchBar from "components/SearchBar";
import Gallery from "components/Gallery";
import Footer from "components/Footer";
import { fetchArtworks, useArtworks } from "data/artworks";
import { SWRConfig } from "swr";
import fetcher from "data/base";
import { ArtworkConciseDerived } from "types/artwork";

export const PAGE_SIZE = 12;
export const INITIAL_PAGE = 1;

// Load artworks on the server side so that the gallery is preloaded
export async function getStaticProps() {
  const { artworks, url } = await fetchArtworks(PAGE_SIZE, INITIAL_PAGE);
  return {
    props: {
      swrFallback: {
        [url]: artworks,
      },
    },
    // Incremental Static Regeneration
    revalidate: 60,
  };
}

const List = () => {
  const [page, setPage] = useState(INITIAL_PAGE);
  const [query, setQuery] = useState<string | undefined>();
  const { artworks, maxPage, isLoading, error } = useArtworks(
    PAGE_SIZE,
    page,
    query
  );
  // Prefetch next page
  const _ = useArtworks(PAGE_SIZE, page + 1, query);

  const handleSubmit = (newQuery: string) => {
    setQuery(newQuery);
    setPage(INITIAL_PAGE);
  };

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
          <SearchBar onSubmit={handleSubmit} />
          {error && (
            <ErrorCard message="Could not load new artworks! Check your internet connection" />
          )}
          {isLoading && !artworks && <Spinner />}
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

const Page: NextPage<{ swrFallback: ArtworkConciseDerived[] }> = ({
  swrFallback,
}) => {
  return (
    <SWRConfig
      value={{
        refreshInterval: 30000,
        fetcher,
        fallback: swrFallback,
      }}
    >
      <List />
    </SWRConfig>
  );
};

export default Page;
