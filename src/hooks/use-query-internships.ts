"use client";

import { useQuery } from "@tanstack/react-query";
import { getInternships } from "@/services/internships";
import { useSearchParams } from "next/navigation";

const useQueryInternships = () => {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("internshipPage") || "1");
  const search = searchParams.get("internshipSearch") || "";
  const roleCategory = searchParams.get("roleCategory") || "";
  const activeTab = searchParams.get("tab") || "internships";

  return useQuery({
    queryKey: ["internships", page, search, roleCategory, activeTab],
    queryFn: () => getInternships(page, search, roleCategory),
    enabled: activeTab === "internships",
  });
};

export default useQueryInternships; 