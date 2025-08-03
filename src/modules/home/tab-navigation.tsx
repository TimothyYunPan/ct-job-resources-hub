"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import PostList from "./post-list";
import InternshipList from "./internship-list";

const TabNavigation = () => {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "internships");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams);
    params.set("tab", tab);
    // Reset pagination when switching tabs
    if (tab === "posts") {
      params.set("page", "1");
      params.delete("internshipPage");
      params.delete("internshipSearch");
    } else {
      params.set("internshipPage", "1");
      params.delete("page");
    }
    window.history.replaceState(null, "", `?${params.toString()}`);
  };

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex border-b border-white/10 mb-6">
        <button
          onClick={() => handleTabChange("internships")}
          className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === "internships"
            ? "text-white border-b-2 border-white"
            : "text-white/50 hover:text-white/80"
            }`}
        >
          Summer 2026 Internships
        </button>
        <button
          onClick={() => handleTabChange("posts")}
          className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === "posts"
            ? "text-white border-b-2 border-white"
            : "text-white/50 hover:text-white/80"
            }`}
        >
          Articles
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "internships" && <InternshipList />}
        {activeTab === "posts" && <PostList />}
      </div>
    </div>
  );
};

export default TabNavigation; 