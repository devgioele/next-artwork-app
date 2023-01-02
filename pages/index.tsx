import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div className="flex h-full min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Artwork Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-start px-10 py-10 text-center">
        <h1 className="bg-aicRed p-3 text-6xl font-bold">
          <a className="text-white" href="https://www.artic.edu/">
            Art Institute of Chicago
          </a>
        </h1>
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
