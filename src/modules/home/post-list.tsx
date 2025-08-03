"use client";

import Link from "next/link";
import Post from "@/components/post";
import Pagination from "@/modules/home/pagination";
import CommentEditor from "@/modules/home/comment-editor";
import useQueryPostList from "@/hooks/use-query-post-list";
import { useState } from "react";

const PostList = () => {
  const { data, isLoading, error } = useQueryPostList();
  const { posts = [], totalPages } = data || {};
  const [isCommentEditorOpen, setIsCommentEditorOpen] = useState(false);

  return (
    <div className="mt-4">
      <div>
        <button
          onClick={() => setIsCommentEditorOpen(true)}
          className="w-full h-[42px] flex justify-center items-center rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors text-sm font-medium cursor-pointer"
          title="Add new article"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Article
        </button>
      </div>
      {isLoading && <div className="text-white/50 mt-4">Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {!isLoading && posts.length === 0 && <div>No posts</div>}
      {!isLoading &&
        posts.map((post: Post) => (
          <Link key={post.id} href={`/post/${post.id}`}>
            <Post post={post} />
          </Link>
        ))}
      <div className="mt-8">
        <Pagination totalPages={totalPages} />
      </div>

      <CommentEditor isOpen={isCommentEditorOpen} setIsOpen={setIsCommentEditorOpen} />
    </div>
  );
};

export default PostList;
