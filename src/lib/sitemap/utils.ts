import { create } from 'xmlbuilder2';
import fs from 'fs-extra';
import path from 'path';
import { SitemapUrl } from './types';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;
const SITEMAP_DIR = path.join(process.cwd(), 'public/sitemaps');

export async function generateSitemapFile(urls: SitemapUrl[], filename: string) {
  const root = create({ version: '1.0' })
    .ele('urlset', { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' });

  urls.forEach(({ url, lastmod, priority, changefreq }) => {
    const urlElement = root.ele('url');
    urlElement.ele('loc').txt(`${BASE_URL}${url}`);
    if (lastmod) urlElement.ele('lastmod').txt(lastmod);
    if (priority) urlElement.ele('priority').txt(priority.toString());
    if (changefreq) urlElement.ele('changefreq').txt(changefreq);
  });

  const xml = root.end({ prettyPrint: true });
  const filePath = path.join(SITEMAP_DIR, filename);
  await fs.ensureDir(SITEMAP_DIR);
  await fs.outputFile(filePath, xml);
}

export async function generateSitemapIndex(sitemapFiles: string[]) {
  const root = create({ version: '1.0' })
    .ele('sitemapindex', { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' });

  sitemapFiles.forEach(filename => {
    root.ele('sitemap')
      .ele('loc').txt(`${BASE_URL}/sitemaps/${filename}`);
  });

  const xml = root.end({ prettyPrint: true });
  await fs.outputFile(path.join(SITEMAP_DIR, 'sitemap.xml'), xml);
}