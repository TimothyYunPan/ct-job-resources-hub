"use client";

import { useQuery } from "@tanstack/react-query";
import { getInternships } from "@/services/internships";
import { useSearchParams } from "next/navigation";

const useQueryInternships = () => {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("internshipPage") || "1");
  const search = searchParams.get("internshipSearch") || "";

  return useQuery({
    queryKey: ["internships", page, search],
    queryFn: () => getInternships(page, search),
  });
};

export default useQueryInternships; 