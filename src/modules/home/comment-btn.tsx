"use client";

import { useState, useEffect } from "react";
import CommentEditor from "./comment-editor";

const CommentBtn = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpenEditor = () => {
      setIsOpen(true);
    };

    window.addEventListener('openCommentEditor', handleOpenEditor);

    return () => {
      window.removeEventListener('openCommentEditor', handleOpenEditor);
    };
  }, []);

  return (
    <CommentEditor isOpen={isOpen} setIsOpen={setIsOpen} />
  );
};

export default CommentBtn;
