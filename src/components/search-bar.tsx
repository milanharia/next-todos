import { SearchIcon } from "@/app/icons";

export function SearchBar() {
  return (
    <div className="bg-slate-800 focus-within:outline outline-slate-50 flex items-center gap-4 md:mb-4 p-4 rounded-md w-full">
      <SearchIcon />
      <input
        type="text"
        className="bg-slate-800 w-full focus-within:outline-none"
        placeholder="Search todos..."
      />
    </div>
  );
}
