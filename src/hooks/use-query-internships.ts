"use client";

import { useQuery } from "@tanstack/react-query";
import { getInternships } from "@/services/internships";
import { useSearchParams } from "next/navigation";

const useQueryInternships = () => {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("internshipPage") || "1");
  const search = searchParams.get("internshipSearch") || "";
  const activeTab = searchParams.get("tab") || "internships";

  return useQuery({
    queryKey: ["internships", page, search, activeTab],
    queryFn: () => getInternships(page, search),
    enabled: activeTab === "internships", // Only fetch when internships tab is active
  });
};

export default useQueryInternships; 