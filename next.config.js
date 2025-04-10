/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '',
  assetPrefix: '',
  trailingSlash: true,
  distDir: 'out',
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['critters']
  },
};

module.exports = nextConfig;
