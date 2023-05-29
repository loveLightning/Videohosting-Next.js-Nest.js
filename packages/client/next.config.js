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
    ],
  },
}

module.exports = nextConfig
