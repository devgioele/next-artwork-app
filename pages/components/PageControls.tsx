import { Dispatch, SetStateAction } from "react";

export default function PageControls({page, setPage, maxPage}:{page: number, setPage: Dispatch<SetStateAction<number>>, maxPage: number}) {
  const decrement = () => setPage((prevPage) => prevPage > 1 ? prevPage - 1 : prevPage);
  const increment = () => setPage((prevPage) => prevPage < maxPage  ? prevPage + 1 : prevPage);

  return <div className="flex justify-center items-center gap-4">
    <button className="bg-artic-red text-white rounded px-3 py-1 disabled:bg-neutral-500" disabled={page==1} onClick={decrement}>← Prev</button>
    <div className="font-bold text-lg">{page} / {maxPage}</div>
    <button className="bg-artic-red text-white rounded px-3 py-1 disabled:bg-neutral-500" disabled={page==maxPage} onClick={increment}>Next →</button>
    </div>
}