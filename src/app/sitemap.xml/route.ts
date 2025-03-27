// app/sitemap.xml/route.ts
import { NextResponse } from 'next/server';
import { create } from 'xmlbuilder2';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    // 1) Create <sitemapindex>
    const root = create({ version: '1.0' }).ele('sitemapindex', {
      xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
    });

    // 2) Add references to sub-sitemaps
    const sitemaps = ['sitemap-static.xml', 'sitemap-products.xml', 'sitemap-events.xml'];

    sitemaps.forEach((filename) => {
      const smElem = root.ele('sitemap');
      smElem.ele('loc').txt(`${BASE_URL}/${filename}`);
      smElem.ele('lastmod').txt(new Date().toISOString());
    });

    // 3) Build final XML
    const xmlString = root.end({ prettyPrint: true });

    return new NextResponse(xmlString, {
      headers: { 'Content-Type': 'application/xml' },
    });
  } catch (error) {
    console.error('[Sitemap Index Error]', error);
    return NextResponse.json({ error: 'Failed to generate sitemap index' }, { status: 500 });
  }
}
