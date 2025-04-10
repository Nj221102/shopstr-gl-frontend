/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: 'export',  // Required for GitHub Pages static export
  basePath: process.env.NODE_ENV === 'production' ? '/shopstr-gl-frontend' : '',  // GitHub repository name
  images: {
    unoptimized: true, // Required for static export
  },
  eslint: {
    ignoreDuringBuilds: true
  },
};

module.exports = nextConfig;
