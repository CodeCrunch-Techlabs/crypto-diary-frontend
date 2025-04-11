import type { NextConfig } from "next";
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});


const config: NextConfig = {
  images: {
    domains: [
      "crypto-diary-product-images-bucket.s3.eu-north-1.amazonaws.com",
    ],
  },
  async headers() {
    return [
      {
        source: "/sitemaps/:path*",
        headers: [
          { 
            key: "Cache-Control",
            value: "public, s-maxage=86400, stale-while-revalidate=3600",
          },
        ],
      },
    ];
  },
};

const nextConfig = withBundleAnalyzer(config);

export default nextConfig;
