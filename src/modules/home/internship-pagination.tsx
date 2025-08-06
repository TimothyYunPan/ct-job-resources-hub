"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface InternshipPaginationProps {
  totalPages: number;
}

const InternshipPagination = ({ totalPages }: InternshipPaginationProps) => {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("internshipPage") || "1");
  const activeTab = searchParams.get("tab") || "internships";
  const search = searchParams.get("internshipSearch") || "";
  const roleCategory = searchParams.get("roleCategory") || "";

  // 顯示更多頁面（最多 10 個可見）
  const getVisiblePages = () => {
    const pages = [];
    const start = Math.max(1, currentPage - 4);
    const end = Math.min(totalPages, currentPage + 5);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const visiblePages = getVisiblePages();

  const buildUrl = (page: number) => {
    const params = new URLSearchParams();
    params.set("tab", activeTab);
    params.set("internshipPage", page.toString());
    if (search) {
      params.set("internshipSearch", search);
    }
    if (roleCategory && roleCategory !== "all") {
      params.set("roleCategory", roleCategory);
    }
    return `?${params.toString()}`;
  };

  return (
    <div className="flex items-center justify-center gap-1 text-sm">
      {/* 上一頁按鈕 */}
      {currentPage > 1 && (
        <Link
          href={buildUrl(currentPage - 1)}
          className="px-3 py-2 text-white/50 hover:text-white hover:bg-white/10 rounded-md transition-all duration-200 cursor-pointer"
        >
          ←
        </Link>
      )}

      {/* 第一頁 */}
      {visiblePages[0] > 1 && (
        <>
          <Link
            href={buildUrl(1)}
            className="px-3 py-2 text-white/50 hover:text-white hover:bg-white/10 rounded-md transition-all duration-200 cursor-pointer"
          >
            1
          </Link>
          {visiblePages[0] > 2 && (
            <span className="px-2 py-2 text-white/30">...</span>
          )}
        </>
      )}

      {/* 可見頁面 */}
      {visiblePages.map((page) => (
        <Link
          href={buildUrl(page)}
          key={page}
          className={`px-3 py-2 rounded-md transition-all duration-200 cursor-pointer ${currentPage === page
            ? "bg-white/20 text-white font-semibold"
            : "text-white/50 hover:text-white hover:bg-white/10"
            }`}
        >
          {page}
        </Link>
      ))}

      {/* 最後一頁 */}
      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="px-2 py-2 text-white/30">...</span>
          )}
          <Link
            href={buildUrl(totalPages)}
            className="px-3 py-2 text-white/50 hover:text-white hover:bg-white/10 rounded-md transition-all duration-200 cursor-pointer"
          >
            {totalPages}
          </Link>
        </>
      )}

      {/* 下一頁按鈕 */}
      {currentPage < totalPages && (
        <Link
          href={buildUrl(currentPage + 1)}
          className="px-3 py-2 text-white/50 hover:text-white hover:bg-white/10 rounded-md transition-all duration-200 cursor-pointer"
        >
          →
        </Link>
      )}
    </div>
  );
};

export default InternshipPagination; 