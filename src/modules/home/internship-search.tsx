"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import RoleFilter from "./role-filter";
import { ROLE_CATEGORIES } from "@/config/constants";

const InternshipSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("internshipSearch") || "");
  const roleCategory = searchParams.get("roleCategory") || "";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchTerm.trim()) {
      params.set("internshipSearch", searchTerm.trim());
    } else {
      params.delete("internshipSearch");
    }
    if (roleCategory) {
      params.set("roleCategory", roleCategory);
    }
    params.set("tab", "internships");
    params.set("internshipPage", "1");
    router.push(`?${params.toString()}`);
  };

  // 單獨清除 keyword
  const handleClearKeyword = () => {
    setSearchTerm("");
    const params = new URLSearchParams(searchParams);
    params.delete("internshipSearch");
    params.set("tab", "internships");
    params.set("internshipPage", "1");
    router.push(`?${params.toString()}`);
  };

  // 單獨清除 tag
  const handleClearTag = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("roleCategory");
    params.set("tab", "internships");
    params.set("internshipPage", "1");
    router.push(`?${params.toString()}`);
  };

  // 切換 tag 時自動清除 keyword
  const handleTagChange = (category: string) => {
    setSearchTerm("");
    const params = new URLSearchParams(searchParams);
    if (category === "all") {
      params.delete("roleCategory");
    } else {
      params.set("roleCategory", category);
    }
    params.delete("internshipSearch");
    params.set("tab", "internships");
    params.set("internshipPage", "1");
    router.push(`?${params.toString()}`);
  };

  // 顯示目前條件
  const hasActiveFilter = !!(searchParams.get("internshipSearch") || (roleCategory && roleCategory !== "all"));
  const currentRoleLabel = roleCategory && roleCategory !== "all" && ROLE_CATEGORIES[roleCategory as keyof typeof ROLE_CATEGORIES]?.label;

  return (
    <div className="space-y-4">
      <RoleFilter onTagChange={handleTagChange} currentCategory={roleCategory} />

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
            onClick={() => setSearchTerm("")}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-md transition-colors text-sm cursor-pointer"
          >
            Clear
          </button>
        )}
      </form>
      {/* 篩選條件顯示區塊 */}
      {hasActiveFilter && (
        <div className="flex flex-wrap items-center gap-2 text-xs text-white/80 mt-2">
          <span>Current filters:</span>
          {searchParams.get("internshipSearch") && (
            <span className="bg-white/10 px-2 py-1 rounded flex items-center gap-1">
              Keyword: {searchParams.get("internshipSearch")}
              <button onClick={handleClearKeyword} className="ml-1 text-white/60 hover:text-white">✕</button>
            </span>
          )}
          {currentRoleLabel && (
            <span className="bg-white/10 px-2 py-1 rounded flex items-center gap-1">
              Type: {currentRoleLabel}
              <button onClick={handleClearTag} className="ml-1 text-white/60 hover:text-white">✕</button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default InternshipSearch; 