"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const InternshipSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("internshipSearch") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);

    if (searchTerm.trim()) {
      params.set("internshipSearch", searchTerm.trim());
    } else {
      params.delete("internshipSearch");
    }
    params.set("tab", "internships");
    params.set("internshipPage", "1"); // Reset to first page when searching

    router.push(`?${params.toString()}`);
  };

  const handleClear = () => {
    setSearchTerm("");
    const params = new URLSearchParams(searchParams);
    params.delete("internshipSearch");
    params.set("tab", "internships");
    params.set("internshipPage", "1");
    router.push(`?${params.toString()}`);
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by company or role..."
          className="flex-1 px-3 py-2 bg-transparent border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:border-white/40"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors text-sm cursor-pointer"
        >
          Search
        </button>
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-md transition-colors text-sm cursor-pointer"
          >
            Clear
          </button>
        )}
      </form>
    </div>
  );
};

export default InternshipSearch; 