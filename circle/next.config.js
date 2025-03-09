const path = require('path')

/**
 * @type {import('next').NextConfig} nextConfig */

const nextConfig = {
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time
    API_URL: process.env.API_URL || 'http://localhost:8000',
    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
    BUGSNAG_API_KEY: process.env.BUGSNAG_API_KEY,
    NEXT_PUBLIC_MAINTENANCE_MODE: process.env.NEXT_PUBLIC_MAINTENANCE_MODE,
  },

  images: {
    domains: [
      'localhost',
      'api.uu-circles.com',
      'static.uu-circles.com',
      'd20rb0br4fsl6o.cloudfront.net',
      'firebasestorage.googleapis.com',
    ],
  },

  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },

  eslint: {
    dirs: ['src'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
}

module.exports = nextConfig
