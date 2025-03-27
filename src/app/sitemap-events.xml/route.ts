import { NextResponse } from 'next/server';
import { create } from 'xmlbuilder2';
import { fetchAllEventIds } from '@/utils/eventApi';
import { generateSlug } from '@/utils/generateSlug';


export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    // 1) Fetch events
    const eventsData = await fetchAllEventIds();

    // 2) Create XML root
    const root = create({ version: '1.0' }).ele('urlset', {
      xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
    });

    // 3) Add each event
    eventsData.events.forEach((event: { title: string; id: number }) => {
      const urlElem = root.ele('url');

      const slug = generateSlug(event.title);

      urlElem.ele('loc').txt(`${BASE_URL}/event/${slug}/${event.id}`);
      urlElem.ele('lastmod').txt(new Date().toISOString());
      urlElem.ele('changefreq').txt('weekly');
      urlElem.ele('priority').txt('0.8');
    });

    // 4) Build final XML
    const xmlString = root.end({ prettyPrint: true });

    return new NextResponse(xmlString, {
      headers: { 'Content-Type': 'application/xml' },
    });
  } catch (error) {
    console.error('[Events Sitemap Error]', error);
    return NextResponse.json({ error: 'Failed to generate events sitemap' }, { status: 500 });
  }
}   