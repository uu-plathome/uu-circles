const path = require('path')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
// const withPWA = require('next-pwa')

module.exports = withBundleAnalyzer({
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time
    API_URL: process.env.API_URL || 'http://localhost:8000',
    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
    BUGSNAG_API_KEY: process.env.BUGSNAG_API_KEY,
  },

  images: {
    domains: [
      'api.uu-circles.com',
      'media.uu-circles.com',
      'media-image.uu-circles.com',
      'static.uu-circles.com',
      'd20rb0br4fsl6o.cloudfront.net',
      'localhost',
      'firebasestorage.googleapis.com',
      'ulab-uu.com',
    ],
  },

  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },

  eslint: {
    dirs: ['src'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },

  pwa: {
    dest: 'public', // swの出力ディレクトリ
    disable: process.env.NODE_ENV === 'development',
  },
})
