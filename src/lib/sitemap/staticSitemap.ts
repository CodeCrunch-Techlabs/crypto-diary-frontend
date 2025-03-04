import { generateSitemapFile } from "./utils";

// src/lib/sitemap/staticSitemap.ts
export const staticUrls = [
    { url: '/', priority: 1.0 },
    { url: '/products', priority: 0.9 },
    { url: '/events', priority: 0.9 },
    // Add other static paths
  ];
  
  export async function generateStaticSitemap() {
    const urls = staticUrls.map(({ url, priority }) => ({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}${url}`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily' as const,
      priority
    }));
  
    await generateSitemapFile(urls, 'sitemap-static.xml');
  }