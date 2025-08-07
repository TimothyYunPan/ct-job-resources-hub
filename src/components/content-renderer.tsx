"use client";

import { useMemo } from "react";
import UrlPreview from "./url-preview";
import { extractUrls } from "@/utils/url-utils";

interface ContentRendererProps {
  content: string;
}

const ContentRenderer = ({ content }: ContentRendererProps) => {
  // 確保 content 存在
  if (!content) {
    return <p className="text-sm text-white/50 mt-2">No content</p>;
  }

  const urls = useMemo(() => extractUrls(content), [content]);

  if (urls.length === 0) {
    return <p className="text-sm text-white/50 mt-2">{content}</p>;
  }

  // 使用 useMemo 優化渲染邏輯
  const contentParts = useMemo(() => {
    const parts = [];
    let remainingContent = content;

    urls.forEach((url, index) => {
      const urlIndex = remainingContent.indexOf(url);
      if (urlIndex !== -1) {
        // 添加 URL 前的文字
        if (urlIndex > 0) {
          parts.push(
            <p key={`text-${index}`} className="text-sm text-white/50 mb-2">
              {remainingContent.substring(0, urlIndex)}
            </p>
          );
        }

        // 添加 URL 預覽
        parts.push(
          <UrlPreview key={`url-${index}`} url={url} />
        );

        // 更新剩餘內容
        remainingContent = remainingContent.substring(urlIndex + url.length);
      }
    });

    // 添加剩餘的文字
    if (remainingContent.trim()) {
      parts.push(
        <p key="remaining" className="text-sm text-white/50 mb-2">
          {remainingContent}
        </p>
      );
    }

    return parts;
  }, [content, urls]);

  return <div className="mt-2">{contentParts}</div>;
};

export default ContentRenderer; 