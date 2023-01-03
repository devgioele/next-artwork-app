import { Dispatch, SetStateAction } from "react";

export default function PageControls({
  page,
  setPage,
  maxPage,
}: {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  maxPage: number;
}) {
  const decrement = () =>
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  const increment = () =>
    setPage((prevPage) => (prevPage < maxPage ? prevPage + 1 : prevPage));

  return (
    <div className="flex items-center justify-center gap-4">
      <button
        className="rounded bg-artic-red px-3 py-1 text-white hover:bg-artic-red-dark disabled:bg-neutral-500"
        disabled={page === 1}
        onClick={decrement}
      >
        ← Prev
      </button>
      <div className="text-lg font-bold">
        {page} / {maxPage}
      </div>
      <button
        className="rounded bg-artic-red px-3 py-1 text-white hover:bg-artic-red-dark disabled:bg-neutral-500"
        disabled={page === maxPage}
        onClick={increment}
      >
        Next →
      </button>
    </div>
  );
}
