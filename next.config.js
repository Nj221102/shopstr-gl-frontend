/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  
  // Only use export for production builds
  ...(process.env.NODE_ENV === 'production' ? {
    output: 'export',  // Required for GitHub Pages static export
    images: {
      unoptimized: true, // Required for static export
    },
  } : {}),
  
  eslint: {
    ignoreDuringBuilds: true
  },
};

module.exports = nextConfig;
