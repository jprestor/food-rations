const bundleAnalyzer = require('@next/bundle-analyzer');

const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        hostname: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'localhost',
      },
    ],
  },
  modularizeImports: {
    lodash: { transform: 'lodash/{{member}}' },
    '@/ui': { transform: '@/components/ui/{{member}}' },
  },
};

module.exports = (phase, defaultConfig) => {
  const plugins = [
    bundleAnalyzer({
      enabled: process.env.ANALYZE === 'true',
    }),
  ];

  const config = plugins.reduce(
    (acc, plugin) => {
      const update = plugin(acc);
      return typeof update === 'function'
        ? update(phase, defaultConfig)
        : update;
    },
    { ...nextConfig },
  );

  return config;
};
