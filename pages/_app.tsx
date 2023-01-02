import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

const fetcher = (input: RequestInfo | URL, init?: RequestInit) =>
  fetch(input, init).then((res) => res.json());

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 4000,
        fetcher,
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}
