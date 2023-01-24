const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.feras.club/:path*',
      },
    ]
  },

  sentry: {
    hideSourceMaps: true,
  },
};

const sentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
};

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
