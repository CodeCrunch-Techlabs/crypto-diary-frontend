import type { NextConfig } from "next";

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

export default config;
