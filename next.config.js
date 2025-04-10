/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: 'export',  // Required for GitHub Pages static export
  basePath: process.env.GITHUB_ACTIONS ? '/shopstr-gl-frontend' : '',
  images: {
    unoptimized: true, // Required for static export
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  assetPrefix: process.env.GITHUB_ACTIONS ? '/shopstr-gl-frontend' : '',
};

module.exports = nextConfig;
