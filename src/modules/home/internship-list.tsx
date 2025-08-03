"use client";

import InternshipCard from "@/components/internship-card";
import InternshipPagination from "@/modules/home/internship-pagination";
import InternshipSearch from "@/modules/home/internship-search";
import useQueryInternships from "@/hooks/use-query-internships";

const InternshipList = () => {
  const { data, isLoading, error } = useQueryInternships();
  const { internships = [], totalPages, search } = data || {};

  return (
    <div className="mt-4">
      {/* <h2 className="text-xl font-bold mb-4">Summer 2026 Internships</h2> */}
      <InternshipSearch />
      {isLoading && <div className="text-white/50 mt-4">Loading...</div>}
      {error && <div className="text-red-400">Error: {error.message}</div>}
      {!isLoading && internships.length === 0 && (
        <div className="text-white/50">
          {search ? `No internships found for "${search}"` : "No internships found"}
        </div>
      )}
      {!isLoading &&
        internships.map((internship: Internship) => (
          <InternshipCard key={internship._id} internship={internship} />
        ))}
      <div className="mt-8">
        <InternshipPagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default InternshipList; 