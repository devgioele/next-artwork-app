import Link from "next/link";
import { ArtworkConciseDerived } from "types/artwork";
import OptionalImage from "./OptionalImage";

const toPeriod = (start: number, end: number) =>
  start === end ? start : `${start} - ${end}`;

export default function Gallery({
  artworks,
}: {
  artworks: ArtworkConciseDerived[];
}) {
  return (
    <div className="-mt-6 columns-1 gap-4 space-y-4 sm:columns-2 sm:gap-6 sm:space-y-6 md:columns-3 lg:gap-10 lg:space-y-10 xl:columns-4">
      {artworks.map((artwork) => (
        <div
          key={artwork.id}
          // Apply top margin on first element to achieve height alignment at the top
          className="inline-block w-full first:mt-6"
        >
          <Link
            href={`/artwork/${artwork.id}`}
            className="group flex w-full flex-col items-center rounded rounded-md border bg-white"
          >
            <OptionalImage
              src={artwork.image_url_low}
              unavailable="Preview unavailable"
              classNameImg="rounded-t"
              classNameUnavailable="rounded-t"
            />
            <div className="flex flex-col items-center gap-2 p-5">
              <p className="font-bold group-hover:text-artic-red">
                {artwork.title}
              </p>
              <p className="">{artwork.artist_titles}</p>
              {artwork.date_start && artwork.date_end && (
                <p className="my-1 rounded rounded-full bg-yellow-500 px-2">
                  {toPeriod(artwork.date_start, artwork.date_end)}
                </p>
              )}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
