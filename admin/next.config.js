module.exports = {
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time
    API_URL: process.env.API_URL || 'http://localhost:8000',
    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
  },

  images: {
    domains: [
      'localhost',
      'api.uu-circles.com',
      'static.uu-circles.com',
      'd20rb0br4fsl6o.cloudfront.net',
    ],
  },
}
