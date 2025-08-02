"use client";

import { useQuery } from "@tanstack/react-query";
import { getInternships } from "@/services/internships";
import { useSearchParams } from "next/navigation";

const useQueryInternships = () => {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("internshipPage") || "1");

  return useQuery({
    queryKey: ["internships", page],
    queryFn: () => getInternships(page),
  });
};

export default useQueryInternships; 