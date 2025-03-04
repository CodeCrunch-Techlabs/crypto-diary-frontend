import { generateProductSitemap } from './productSitemap';
import { generateStaticSitemap } from './staticSitemap';
import path from 'path';
import fs from 'fs-extra';
import { create } from 'xmlbuilder2';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;
const SITEMAP_DIR = path.join(process.cwd(), 'public/sitemaps');

async function generateMainSitemap() {
    const sitemaps = [
      'sitemap-static.xml',
      'sitemap-products.xml',
      // Add other category files
    ];

    const root = create({ version: '1.0' })
    .ele('sitemapindex', { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' });

  sitemaps.forEach(filename => {
    root.ele('sitemap')
      .ele('loc').txt(`${BASE_URL}/sitemaps/${filename}`);
  });

  await fs.outputFile(
    path.join(SITEMAP_DIR, 'sitemap.xml'),
    root.end({ prettyPrint: true })
  );
}

export async function generateAllSitemaps() {
    await fs.emptyDir(SITEMAP_DIR);
    
    // Generate category sitemaps
    await generateStaticSitemap();
    await generateProductSitemap();
    // Add other category generators
    
    // Generate main index
    await generateMainSitemap();
  }
 