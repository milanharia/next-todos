"use client";
import { SearchIcon } from "@/app/icons";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export function SearchBar() {
  const router = useRouter();

  return (
    <div className="bg-slate-800 focus-within:outline outline-slate-50 flex items-center gap-4 md:mb-4 p-4 rounded-md w-full">
      <SearchIcon />
      <input
        onChange={(e) => {
          const search = e.target.value;
          const searchParams = new URLSearchParams();
          if (search) {
            searchParams.set("query", search);
          }
          router.push(`/?${searchParams.toString()}`);
        }}
        type="text"
        className="bg-slate-800 w-full focus-within:outline-none"
        placeholder="Search todos..."
      />
    </div>
  );
}
