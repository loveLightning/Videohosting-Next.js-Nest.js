/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires

const nextConfig = {
  transpilePackages: ['@amazon/common', 'lodash-es'],
  reactStrictMode: true,
  env: {
    SERVER_URL: process.env.SERVER_URL,
  },
  experimental: {
    externalDir: true,
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
        port: '3001',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
