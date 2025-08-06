import { NextRequest, NextResponse } from "next/server";
import { withApiHandler } from "@/utils/withApiHandler";

// 簡單的快取機制
const cache = new Map<string, any>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 分鐘

interface CacheEntry {
  data: any;
  timestamp: number;
}

const handler = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL parameter is required" }, { status: 400 });
  }

  // 檢查快取
  const cached = cache.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return NextResponse.json(cached.data);
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LinkPreview/1.0)',
      },
      // 添加超時設定
      signal: AbortSignal.timeout(10000), // 10 秒超時
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();

    // 提取 metadata
    const metadata = extractMetadata(html, url);

    // 儲存到快取
    cache.set(url, {
      data: metadata,
      timestamp: Date.now(),
    });

    return NextResponse.json(metadata);
  } catch (error) {
    console.error('Error fetching URL metadata:', error);
    return NextResponse.json(
      { error: "Failed to fetch URL metadata" },
      { status: 500 }
    );
  }
};

// 提取 metadata 的函數
const extractMetadata = (html: string, url: string) => {
  const metadata: any = {};

  // 提取 title
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch) {
    metadata.title = titleMatch[1].trim();
  }

  // 提取 description
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
  if (descMatch) {
    metadata.description = descMatch[1].trim();
  }

  // 提取 og:title (優先於一般 title)
  const ogTitleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i);
  if (ogTitleMatch) {
    metadata.title = ogTitleMatch[1].trim();
  }

  // 提取 og:description (優先於一般 description)
  const ogDescMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i);
  if (ogDescMatch) {
    metadata.description = ogDescMatch[1].trim();
  }

  // 提取 og:image
  const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i);
  if (ogImageMatch) {
    metadata.image = ogImageMatch[1].trim();
  }

  // 提取 site name
  const siteNameMatch = html.match(/<meta[^>]*property=["']og:site_name["'][^>]*content=["']([^"']+)["']/i);
  if (siteNameMatch) {
    metadata.siteName = siteNameMatch[1].trim();
  }

  // 如果沒有 site name，嘗試從 URL 提取
  if (!metadata.siteName) {
    try {
      const urlObj = new URL(url);
      metadata.siteName = urlObj.hostname.replace('www.', '');
    } catch (e) {
      // 忽略 URL 解析錯誤
    }
  }

  return metadata;
};

export const GET = withApiHandler(handler); 