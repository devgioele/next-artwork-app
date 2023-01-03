import ErrorCard from "components/ErrorCard";
import Footer from "components/Footer";
import { useArtwork } from "data/artworks";
import fetcher from "data/base";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";

const useArtworkRouter = (): { id: number | undefined } => {
  const router = useRouter();
  if (typeof router.query.id === 'string') {
    return {
      id: parseInt(router.query.id),
    };
  } else {
    // If prerendering on the server
    return { id: undefined };
  }
};

const Details = () => {
  const { id } = useArtworkRouter();
  const { artwork, error, isLoading } = useArtwork(id || null);

  let content;
  if(id !== undefined && isNaN(id)) {
    content = <ErrorCard message="Invalid artwork ID!" />;
  } else if(id) {
    content = <>{id}</>; 
  }

  return (
    <div className="flex h-full min-h-screen flex-col items-center justify-center bg-neutral-100">
      <Head>
        <title>Artworks Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex w-full flex-1 flex-col items-center justify-start gap-10 p-4 text-center sm:p-6 md:w-10/12 md:p-10 lg:w-9/12">
        {content}
      </main>
      <Footer />
    </div>
  );
};

const Page: NextPage = () => {
  return (
    <SWRConfig
      value={{
        refreshInterval: 30000,
        fetcher,
      }}
    >
      <Details />
    </SWRConfig>
  );
};

export default Page;