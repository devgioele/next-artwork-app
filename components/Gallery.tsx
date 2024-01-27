import clsx from 'clsx';
import { useArtworks } from 'data/artworks';
import Link from 'next/link';
import { PAGE_SIZE } from 'pages';
import ErrorCard from './ErrorCard';
import OptionalImage from './OptionalImage';
import PageControls, { PageControlsProps } from './PageControls';
import Spinner from './Spinner';

const toPeriod = (start: number, end: number) =>
  start === end ? start : `${start} - ${end}`;

export default function Gallery({
  hidden,
  page,
  query,
  setPage
}: {
  hidden?: boolean
  page: number
  query?: string
} & Pick<PageControlsProps, 'setPage'>) {

  const { artworks, maxPage, isLoading, error } = useArtworks(
    PAGE_SIZE,
    page,
    query
  );

  return (
    <div className={clsx('flex w-full flex-col items-center gap-10', hidden && 'hidden')}>
      {error && (
        <ErrorCard message='Could not load new artworks! Check your internet connection' />
      )}
      {isLoading && !artworks && <Spinner />}
      {artworks && maxPage && (
        <>
          <PageControls page={page} maxPage={maxPage} setPage={setPage} />
          <div className='-mt-4 columns-1 gap-4 space-y-4 sm:-mt-6 sm:columns-2 sm:gap-6 sm:space-y-6 md:columns-3 lg:-mt-10 lg:gap-10 lg:space-y-10 xl:columns-4'>
            {artworks.map((artwork) => (
              <div
                key={artwork.id}
                // Apply top margin on first element to achieve height alignment at the top
                className='inline-block w-full first:mt-4 sm:first:mt-6 lg:first:mt-10'
              >
                <Link
                  href={`/artwork/${artwork.id}`}
                  className='group flex w-full flex-col items-center rounded-md border bg-white'
                >
                  <OptionalImage
                    src={artwork.image_url_low}
                    unavailable='Preview unavailable'
                    classNameImg='rounded-t'
                    classNameUnavailable='rounded-t'
                  />
                  <div className='flex flex-col items-center gap-2 p-5'>
                    <p className='font-bold group-hover:text-artic-red'>
                      {artwork.title}
                    </p>
                    <p className=''>{artwork.artist_titles}</p>
                    {artwork.date_start && artwork.date_end && (
                      <p className='my-1 rounded-full bg-yellow-500 px-2'>
                        {toPeriod(artwork.date_start, artwork.date_end)}
                      </p>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <PageControls page={page} maxPage={maxPage} setPage={setPage} />
        </>
      )}
    </div>
  );
}
