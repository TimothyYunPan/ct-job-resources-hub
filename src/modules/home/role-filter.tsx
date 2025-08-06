"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ROLE_CATEGORIES } from "@/config/constants";

interface RoleFilterProps {
  onTagChange?: (category: string) => void;
  currentCategory?: string;
}

const RoleFilter = ({ onTagChange, currentCategory }: RoleFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selected = currentCategory || searchParams.get("roleCategory") || "all";

  const handleCategoryChange = (category: string) => {
    if (onTagChange) {
      onTagChange(category);
    } else {
      const params = new URLSearchParams(searchParams);
      const search = searchParams.get("internshipSearch") || "";
      if (category === "all") {
        params.delete("roleCategory");
      } else {
        params.set("roleCategory", category);
      }
      params.set("tab", "internships");
      params.set("internshipPage", "1");
      if (search) {
        params.set("internshipSearch", search);
      }
      router.push(`?${params.toString()}`);
    }
  };

  return (
    <div className="mb-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleCategoryChange("all")}
          className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${selected === "all"
              ? "bg-white/20 text-white"
              : "bg-white/10 text-white/70 hover:text-white hover:bg-white/15"
            }`}
        >
          All
        </button>
        {Object.entries(ROLE_CATEGORIES).map(([key, category]) => (
          <button
            key={key}
            onClick={() => handleCategoryChange(key)}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${selected === key
                ? "bg-white/20 text-white"
                : "bg-white/10 text-white/70 hover:text-white hover:bg-white/15"
              }`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoleFilter; 