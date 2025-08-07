import { editPost } from "@/services/post";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import ContentRenderer from "./content-renderer";

interface PostProps {
  post?: Post;
  editable?: boolean;
}

const Post = ({ post, editable }: PostProps) => {
  // 確保 post 存在且有必要的屬性
  if (!post) {
    return (
      <div className="w-full border-b border-white/10 py-6">
        <div className="text-white/50">Loading post...</div>
      </div>
    );
  }

  const { id = "", title = "--", content = "-", createdAt = 0 } = post;
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);
  const [isSaving, setIsSaving] = useState(false);
  const queryClient = useQueryClient();
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [inputKey, setInputKey] = useState("");
  const [keyError, setKeyError] = useState("");

  useEffect(() => {
    setEditTitle(title);
    setEditContent(content);
  }, [title, content]);

  const handleSave = async () => {
    setIsSaving(true);
    await editPost(id, { title: editTitle, content: editContent });
    setIsSaving(false);
    setIsEditing(false);
    queryClient.invalidateQueries({ queryKey: ["post", id] });
  };

  if (isEditing) {
    return (
      <div className="w-full border-b border-white/10 py-6">
        <input
          className="w-full border p-2 mb-2 text-md text-white"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <textarea
          className="w-full border p-2 mb-2 text-sm text-white"
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
        />
        <button onClick={handleSave} className="mr-2" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save"}
        </button>
        <button onClick={() => setIsEditing(false)} disabled={isSaving}>
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="w-full border-b border-white/10 py-6">
      <h3 className="text-md text-white font-bold">{title}</h3>
      <ContentRenderer content={content} />
      <p className="text-sm text-white/50 mt-2">
        {new Date(createdAt).toLocaleString()}
      </p>
      {editable && (
        <>
          <button onClick={() => setShowKeyModal(true)} className="mt-2">
            Edit
          </button>
          <Dialog
            open={showKeyModal}
            onClose={() => {
              setShowKeyModal(false);
              setInputKey("");
              setKeyError("");
            }}
            className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-closed:opacity-0"
          >
            <DialogBackdrop className="fixed inset-0 bg-black/70" />
            <DialogPanel className="max-w-lg z-50 space-y-4 bg-[#131313] border border-white/10 p-4 rounded-lg">
              <DialogTitle className="font-bold text-white">
                Permission Required
              </DialogTitle>
              <div className="text-sm text-white/80">
                A key is required to edit or delete before permission system is
                implemented.
              </div>
              <input
                type="password"
                className="w-full h-[40px] border text-sm border-white/10 rounded-md p-2 focus:outline-none bg-transparent text-white"
                placeholder="Enter key"
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
              />
              {keyError && (
                <div className="text-red-500 text-xs mb-2">
                  Key is incorrect!
                </div>
              )}
              <div className="flex gap-4 text-sm justify-end">
                <button
                  className="text-white/50 font-bold cursor-pointer"
                  onClick={() => {
                    setShowKeyModal(false);
                    setInputKey("");
                    setKeyError("");
                  }}
                >
                  Cancel
                </button>
                <button
                  className="text-white font-bold cursor-pointer"
                  onClick={() => {
                    if (inputKey === "1501") {
                      setShowKeyModal(false);
                      setIsEditing(true);
                      setInputKey("");
                      setKeyError("");
                    } else {
                      setKeyError("Key is incorrect!");
                    }
                  }}
                >
                  Confirm
                </button>
              </div>
            </DialogPanel>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default Post;
