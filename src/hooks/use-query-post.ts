"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getPost } from "@/services/post";

const useQueryPost = () => {
  const params = useParams();
  const id = params?.id as string;

  return useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
    enabled: !!id, // 只有當 id 存在時才執行查詢
  });
};

export default useQueryPost;
