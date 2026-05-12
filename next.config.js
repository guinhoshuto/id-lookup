const moduleExports = {
  reactStrictMode: true,
};

const shouldUseSentry =
  Boolean(process.env.SENTRY_AUTH_TOKEN) &&
  Boolean(process.env.SENTRY_ORG) &&
  Boolean(process.env.SENTRY_PROJECT);

if (shouldUseSentry) {
  const { withSentryConfig } = require('@sentry/nextjs');

  module.exports = withSentryConfig(moduleExports, {
    silent: true,
  });
} else {
  module.exports = moduleExports;
}
