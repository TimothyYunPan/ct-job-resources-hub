"use client";

import Post from "@/components/post";
import { useRouter } from "next/navigation";
import useQueryPost from "@/hooks/use-query-post";

const Content = () => {
  const router = useRouter();
  const { data, isLoading, error } = useQueryPost();

  return (
    <div>
      <button
        onClick={() => router.back()}
        className="text-sm text-white font-bold"
      >
        {"← Back"}
      </button>
      {isLoading && <div className="text-white/50 mt-4">Loading...</div>}
      {error && <div className="text-red-400 mt-4">Error: {error.message}</div>}
      {!isLoading && !error && <Post post={data} editable={true} />}
    </div>
  );
};

export default Content;
