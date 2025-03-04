// app/sitemap-static.xml/route.ts
import { NextResponse } from 'next/server';
import { create } from 'xmlbuilder2';

// Let's match your old staticUrls array
const staticUrls = [
  { path: '/', priority: 1.0, changefreq: 'daily' },
  { path: '/products', priority: 0.9, changefreq: 'daily' },
  { path: '/events', priority: 0.9, changefreq: 'daily' },
];

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    // 1) Create XML root
    const root = create({ version: '1.0' }).ele('urlset', {
      xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
    });

    // 2) Add each static URL
    staticUrls.forEach(({ path, priority, changefreq }) => {
      const urlElem = root.ele('url');
      urlElem.ele('loc').txt(`${BASE_URL}${path}`);
      urlElem.ele('lastmod').txt(new Date().toISOString());
      urlElem.ele('changefreq').txt(changefreq);
      urlElem.ele('priority').txt(priority.toString());
    });

    // 3) Build final XML string
    const xmlString = root.end({ prettyPrint: true });

    // 4) Return with correct header
    return new NextResponse(xmlString, {
      headers: { 'Content-Type': 'application/xml' },
    });
  } catch (error) {
    console.error('[Static Sitemap Error]', error);
    return NextResponse.json({ error: 'Failed to generate static sitemap' }, { status: 500 });
  }
}
