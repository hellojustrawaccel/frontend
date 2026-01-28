import type { NextConfig } from 'next';

const config: NextConfig = {
  reactCompiler: true,
  pageExtensions: ['ts', 'tsx'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.scdn.co' },
      { protocol: 'https', hostname: 'mosaic.scdn.co' },
      { protocol: 'https', hostname: 'image-cdn-ak.spotifycdn.com' },
      { protocol: 'https', hostname: 'github.com' },
      { protocol: 'https', hostname: 'cdn.jsdelivr.net' },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/backend/:path*',
        destination: 'http://localhost:3001/:path*',
      },
    ];
  },
};

export default config;
