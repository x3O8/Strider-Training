import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',

  // Required for GitHub Pages (repo name)
  basePath: '/Strider-Training',
  assetPrefix: '/Strider-Training/',

  // Needed because Image Optimization doesn't work in static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;