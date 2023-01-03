import ErrorCard from "components/ErrorCard";
import Footer from "components/Footer";
import OptionalImage from "components/OptionalImage";
import Spinner from "components/Spinner";
import { useArtwork } from "data/artworks";
import fetcher from "data/base";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";
import { StringIndexable } from "types/common";
import { boolToStr, toGps } from "utils/conversion";

const useArtworkRouter = ():
  | { valid: true; id: number; error: undefined }
  | { valid: false; id: undefined; error?: string } => {
  const router = useRouter();
  if (typeof router.query.id === "string") {
    const id = parseInt(router.query.id);
    return id
      ? {
          valid: true,
          id,
          error: undefined,
        }
      : { valid: false, id: undefined, error: "not a number" };
  } else {
    // If prerendering on the server
    return { valid: false, id: undefined };
  }
};

const Details = () => {
  const { valid, id, error: routerError } = useArtworkRouter();
  const { artwork, error, isLoading } = useArtwork(id || null);

  const tableData: StringIndexable<string | number> | undefined = artwork && {
    Period: artwork.date_display || "unknown",
    "Place of origin": artwork.place_of_origin || "unknown",
    Dimensions: artwork.dimensions || "unavailable",
    "On display": boolToStr(artwork.is_on_view),
    Techniques: artwork.technique_titles.join(", ") || "unknown",
    Theme: artwork.theme_titles.join(", ") || "none",
    Materials: artwork.material_titles.join(", ") || "none",
    "GPS (lat/lon)":
      toGps(artwork.latitude, artwork.longitude, 6) || "unavailable",
    "Public domain": boolToStr(artwork.is_public_domain),
    Credits: artwork.credit_line || "none",
  };

  console.log("valid", valid);
  console.log("id", id);
  console.log("routerError", routerError);

  console.log("artwork", artwork);
  console.log("error", error);
  console.log("isLoading", isLoading);

  let content;
  if (valid) {
    if (error) {
      content = (
        <ErrorCard message="Could not load the artwork you are looking for! Check your internet connection" />
      );
    } else if (isLoading && !artwork) {
      // If loading and not some existing version to show
      content = <Spinner />;
    } else {
      content = (
        <>
          {artwork && tableData && (
            <div className="flex flex-col gap-20">
              <div className="flex flex-col gap-8">
                <h1 className="text-4xl font-bold">{artwork.title}</h1>
                <h2 className="text-xl text-neutral-800">
                  {artwork.artist_display}
                </h2>
              </div>
              <div className="flex flex-col items-center gap-20">
                <div className="flex flex-col items-center gap-20 md:flex-row md:gap-10 lg:gap-20">
                  <OptionalImage
                    src={artwork.image_url_high}
                    unavailable="Image unavailable"
                    classNameImg="rounded"
                    classNameUnavailable="rounded"
                  />
                  <table className="w-full table-auto border-collapse text-center">
                    <tbody className="align-baseline">
                      {Object.keys(tableData).map((property) => (
                        <tr key={property}>
                          <td className="border-b border-slate-200 p-4 pl-8 align-middle font-bold">
                            {property}
                          </td>
                          <td className="border-b border-slate-200 p-4 pr-8 align-middle">
                            {tableData[property]}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Link
                  href="/"
                  className="w-fit rounded bg-artic-red px-3 py-1 text-white hover:bg-artic-red-dark"
                >
                  ← Back
                </Link>
              </div>
            </div>
          )}
        </>
      );
    }
  } else if (routerError) {
    content = <ErrorCard message="Invalid artwork ID!" />;
  }

  return (
    <div className="flex h-full min-h-screen flex-col items-center justify-center bg-neutral-100">
      <Head>
        <title>Artworks Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex w-full w-10/12 flex-1 flex-col items-center justify-start gap-10 px-4 pt-20 pb-20 text-center sm:px-6 sm:pt-20 md:px-10 md:pt-20">
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
