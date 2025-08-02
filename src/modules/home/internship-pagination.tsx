"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface InternshipPaginationProps {
  totalPages: number;
}

const InternshipPagination = ({ totalPages }: InternshipPaginationProps) => {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("internshipPage") || "1");
  const postPage = searchParams.get("page") || "1";

  // Show more pages around current page (up to 10 visible)
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

  return (
    <div className="flex items-center justify-center gap-1 text-sm">
      {/* Previous button */}
      {currentPage > 1 && (
        <Link
          href={`?page=${postPage}&internshipPage=${currentPage - 1}`}
          className="px-3 py-2 text-white/50 hover:text-white hover:bg-white/10 rounded-md transition-all duration-200"
        >
          ←
        </Link>
      )}

      {/* First page */}
      {visiblePages[0] > 1 && (
        <>
          <Link
            href={`?page=${postPage}&internshipPage=1`}
            className="px-3 py-2 text-white/50 hover:text-white hover:bg-white/10 rounded-md transition-all duration-200"
          >
            1
          </Link>
          {visiblePages[0] > 2 && (
            <span className="px-2 py-2 text-white/30">...</span>
          )}
        </>
      )}

      {/* Visible pages */}
      {visiblePages.map((page) => (
        <Link
          href={`?page=${postPage}&internshipPage=${page}`}
          key={page}
          className={`px-3 py-2 rounded-md transition-all duration-200 ${currentPage === page
            ? "bg-white/20 text-white font-semibold"
            : "text-white/50 hover:text-white hover:bg-white/10"
            }`}
        >
          {page}
        </Link>
      ))}

      {/* Last page */}
      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="px-2 py-2 text-white/30">...</span>
          )}
          <Link
            href={`?page=${postPage}&internshipPage=${totalPages}`}
            className="px-3 py-2 text-white/50 hover:text-white hover:bg-white/10 rounded-md transition-all duration-200"
          >
            {totalPages}
          </Link>
        </>
      )}

      {/* Next button */}
      {currentPage < totalPages && (
        <Link
          href={`?page=${postPage}&internshipPage=${currentPage + 1}`}
          className="px-3 py-2 text-white/50 hover:text-white hover:bg-white/10 rounded-md transition-all duration-200"
        >
          →
        </Link>
      )}
    </div>
  );
};

export default InternshipPagination; 