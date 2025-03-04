// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   images:{
//     domains: ['crypto-diary-product-images-bucket.s3.eu-north-1.amazonaws.com'], 
//   }
// };

// export default nextConfig;


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

export default nextConfig;
