import type { NextPage } from 'next';
import Head from 'next/head';
import Gallery from 'components/Gallery';
import Footer from 'components/Footer';
import { fetchArtworks } from 'data/artworks';
import { SWRConfig } from 'swr';
import fetcher from 'data/base';
import { ArtworkConciseDerived } from 'types/artwork';
import SearchBar from 'components/SearchBar';
import { useState } from 'react';

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

  const handleSubmit = (newQuery: string) => {
    setQuery(newQuery);
    setPage(INITIAL_PAGE);
  };

  return (
    <div className='flex h-full min-h-screen flex-col items-center justify-center bg-neutral-100'>
      <Head>
        <title>Artworks Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='flex w-full flex-1 flex-col items-center justify-start gap-10 p-4 text-center sm:p-6 md:w-10/12 md:p-10 lg:w-9/12'>
        <h1 className='p-3 text-6xl font-bold'>
          <a className='text-black' href='https://www.artic.edu/'>
            Art Institute of Chicago
          </a>
        </h1>
        <div className='flex w-full flex-col items-center gap-10'>
          <SearchBar onSubmit={handleSubmit} />
          <Gallery page={page} query={query} setPage={setPage} />
          <Gallery page={page+1} query={query} setPage={setPage} hidden />
          <Gallery page={page+2} query={query} setPage={setPage} hidden />
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
