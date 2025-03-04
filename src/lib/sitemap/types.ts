export interface SitemapUrl {
    url: string;
    lastmod?: string;
    priority?: number;
    changefreq?: 'always'|'hourly'|'daily'|'weekly'|'monthly'|'yearly'|'never';
  }

  export interface Product {
    id: string;
    name: string;
  }
  
  export interface ContentSource<T = Product> {
    fetchData: () => Promise<T[]>;
    mapToUrls: (items: T[]) => SitemapUrl[];
    sitemapPath: string;
    priority: number;
  }
  
  export interface SitemapConfig {
    contentSources: ContentSource[];
    staticPaths: SitemapUrl[];
    maxUrlsPerFile?: number;
  }