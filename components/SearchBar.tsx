import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react";

export default function SearchBar({
  onSubmit,
}: {
  onSubmit: Dispatch<SetStateAction<string | undefined>>;
}) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    onSubmit(inputValue);
    // Do not reload page
    event.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-10 w-10/12 items-stretch gap-2 rounded-lg border bg-white md:w-4/6"
    >
      <input
        type="query"
        className="ml-3 min-w-0 min-w-fit flex-1 flex-1 rounded-l-lg placeholder-shown:text-slate-700 focus:outline-none"
        placeholder="Search artworks"
        onChange={handleChange}
      />
      <button
        type="submit"
        className="flex aspect-square w-[40px] flex-none flex-col items-center justify-center rounded-r-lg hover:bg-zinc-100"
      >
        <img className="h-1/2 w-1/2" src="/search.svg" alt="search icon" />
      </button>
    </form>
  );
}
