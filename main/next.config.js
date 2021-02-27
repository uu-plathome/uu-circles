const withPWA = require("next-pwa");

module.exports = withPWA({
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time
    API_URL: process.env.API_URL || 'http://localhost:8000',
    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
  },

  images: {
    domains: [
      'd20rb0br4fsl6o.cloudfront.net',
      'localhost',
      'api.uu-circles.com',
      'firebasestorage.googleapis.com',
    ],
  },

  pwa: {
    dest: "public", // swの出力ディレクトリ
  },
});