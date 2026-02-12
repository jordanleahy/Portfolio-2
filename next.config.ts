import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wgwmzfbnkovumqcvsxgd.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'www.jordanleahy.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    localPatterns: [
      {
        pathname: '/**',
        search: '',
      },
      {
        pathname: '/**',
        search: '?v=2',
      },
      {
        pathname: '/**',
        search: '?v=3',
      },
      {
        pathname: '/**',
        search: '?v=4',
      },
    ],
  },
};

export default nextConfig;
