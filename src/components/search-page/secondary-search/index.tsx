"use client";

import { Search as SearchIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type SecondarySearchProps = {
  count: number;
};

export default function SecondarySearch({ count }: SecondarySearchProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [secondarySearchTerm, setSecondarySearchTerm] = useState<string | "">(
    searchParams.get("query") || ""
  );

  const handleSearch = (query: string) => {
    if (!query) {
      return;
    }

    const params = new URLSearchParams();
    params.set("query", query);
    router.replace(`/search/?${params.toString()}`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(secondarySearchTerm);
  };

  useEffect(() => {
    setSecondarySearchTerm(searchParams.get("query") || "");
  }, [searchParams]);

  return (
    <form
      className="flex w-full  justify-center"
      id="secondary-search"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col w-full md:w-10/12 gap-2 my-10 mx-auto">
        <div className="relative flex items-center w-full">
          <SearchIcon className="w-7 h-7 absolute text-black/50 left-4" />
          <input
            id="secondary-search-input"
            name="secondary-search-input-name"
            type="text"
            className="w-full rounded-xl px-16 py-6 text-black border-black/50 transition-all duration-300 bg-[#F2EBD5]"
            value={secondarySearchTerm}
            onChange={(e) => setSecondarySearchTerm(e.target.value)}
          />
        </div>
        <span className="text-[#F2EBD5]/70 ">
          Total de {count} publicações encontradas
        </span>
      </div>
    </form>
  );
}
