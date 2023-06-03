/** @type {import('next').NextConfig} */

const nextConfig = {
  transpilePackages: ['@amazon/common'],
  reactStrictMode: true,
  publicRuntimeConfig: {
    backendUrl: process.env.SERVER_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'http://45.12.73.2',
        port: '4000',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
