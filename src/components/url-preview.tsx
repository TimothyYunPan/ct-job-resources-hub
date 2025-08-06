"use client";

import { useState, useEffect, useCallback } from "react";
import { isValidUrl, extractDomain } from "@/utils/url-utils";

interface UrlPreviewProps {
  url: string;
}

interface UrlMetadata {
  title?: string;
  description?: string;
  image?: string;
  siteName?: string;
}

// 簡單的快取機制
const metadataCache = new Map<string, UrlMetadata>();

const UrlPreview = ({ url }: UrlPreviewProps) => {
  const [metadata, setMetadata] = useState<UrlMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetadata = useCallback(async () => {
    // 檢查快取
    if (metadataCache.has(url)) {
      setMetadata(metadataCache.get(url)!);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/url-metadata?url=${encodeURIComponent(url)}`);

      if (!response.ok) {
        throw new Error('Failed to fetch metadata');
      }

      const data = await response.json();

      // 儲存到快取
      metadataCache.set(url, data);
      setMetadata(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load preview');
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (url && isValidUrl(url)) {
      fetchMetadata();
    } else {
      setError('Invalid URL');
      setIsLoading(false);
    }
  }, [url, fetchMetadata]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  }, [url]);

  // 載入狀態
  if (isLoading) {
    return (
      <div className="border border-white/10 rounded-lg p-4 mb-4 bg-white/5">
        <div className="animate-pulse">
          <div className="h-4 bg-white/10 rounded mb-2"></div>
          <div className="h-3 bg-white/10 rounded mb-2"></div>
          <div className="h-3 bg-white/10 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  // 錯誤狀態或無 metadata
  if (error || !metadata) {
    return (
      <div className="border border-white/10 rounded-lg p-4 mb-4 bg-white/5">
        <div
          onClick={handleClick}
          className="text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
        >
          {url}
        </div>
      </div>
    );
  }

  // 成功狀態
  return (
    <div
      className="border border-white/10 rounded-lg p-4 mb-4 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex gap-4">
        {metadata.image && (
          <div className="flex-shrink-0">
            <img
              src={metadata.image}
              alt={metadata.title || 'Preview image'}
              className="w-20 h-20 object-cover rounded"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          {metadata.title && (
            <h4 className="text-white font-medium mb-1 line-clamp-2">
              {metadata.title}
            </h4>
          )}
          {metadata.description && (
            <p className="text-white/70 text-sm mb-2 line-clamp-2">
              {metadata.description}
            </p>
          )}
          <div className="flex items-center gap-2 text-xs text-white/50">
            {metadata.siteName && (
              <span>{metadata.siteName}</span>
            )}
            <span>•</span>
            <span className="truncate">{url}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrlPreview; 