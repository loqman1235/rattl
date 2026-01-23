"use client";

import { useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleClear = () => {
    setQuery("");
  };

  return (
    <form
      onSubmit={handleSearch}
      className="sticky top-0 p-5 bg-background z-20"
    >
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-foreground z-10" />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          className="w-full pl-9 pr-10 py-2 rounded-full !bg-background"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-primary/10 text-primary transition-colors"
          >
            <XMarkIcon className="size-4" />
          </button>
        )}
      </div>
    </form>
  );
};
