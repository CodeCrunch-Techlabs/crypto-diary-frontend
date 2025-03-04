// app/sitemap-products.xml/route.ts
import { NextResponse } from 'next/server';
import { create } from 'xmlbuilder2';
import { fetchAllProductIds } from '@/utils/productApi'; 
import { generateSlug } from '@/utils/generateSlug';
// or wherever you fetch products

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    // 1) Fetch products
    const productsData = await fetchAllProductIds(); 

    // 2) Create XML root
    const root = create({ version: '1.0' }).ele('urlset', {
      xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
    });

    // 3) Add each product
    productsData.products.forEach((product: { name: string; id: number }) => {
      const urlElem = root.ele('url');

      const slug = generateSlug(product.name);

      urlElem.ele('loc').txt(`${BASE_URL}/product/${slug}/${product.id}`);
      urlElem.ele('lastmod').txt(new Date().toISOString());
      urlElem.ele('changefreq').txt('weekly');
      urlElem.ele('priority').txt('0.82323');
    });

    // 4) Build final XML
    const xmlString = root.end({ prettyPrint: true });

    // 5) Return
    return new NextResponse(xmlString, {
      headers: { 'Content-Type': 'application/xml' },
    });
  } catch (error) {
    console.error('[Products Sitemap Error]', error);
    return NextResponse.json({ error: 'Failed to generate products sitemap' }, { status: 500 });
  }
}
