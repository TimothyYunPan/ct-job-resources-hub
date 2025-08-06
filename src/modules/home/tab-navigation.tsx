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
    // 切換分頁時重置分頁和搜尋
    if (tab === "posts") {
      params.set("page", "1");
      params.delete("internshipPage");
      params.delete("internshipSearch");
      params.delete("roleCategory");
    } else {
      params.set("internshipPage", "1");
      params.delete("page");
    }
    window.history.replaceState(null, "", `?${params.toString()}`);
  };

  return (
    <div>
      {/* 分頁導航 */}
      <div className="flex border-b border-white/10 mb-6">
        <button
          onClick={() => handleTabChange("internships")}
          className={`px-6 py-3 text-sm font-medium transition-colors cursor-pointer ${activeTab === "internships"
              ? "text-white border-b-2 border-white"
              : "text-white/50 hover:text-white/80"
            }`}
        >
          Summer 2026 Internships
        </button>
        <button
          onClick={() => handleTabChange("posts")}
          className={`px-6 py-3 text-sm font-medium transition-colors cursor-pointer ${activeTab === "posts"
              ? "text-white border-b-2 border-white"
              : "text-white/50 hover:text-white/80"
            }`}
        >
          Articles
        </button>
      </div>

      {/* 分頁內容 */}
      <div>
        {activeTab === "internships" && <InternshipList />}
        {activeTab === "posts" && <PostList />}
      </div>
    </div>
  );
};

export default TabNavigation; 