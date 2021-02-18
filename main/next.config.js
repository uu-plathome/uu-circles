const withPWA = require("next-pwa");

module.exports = withPWA({
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time
    API_URL: process.env.API_URL || 'http://localhost:8000',
  },

  images: {
    domains: [
      'localhost',
      'firebasestorage.googleapis.com',
    ],
  },

  pwa: {
    dest: "public", // swの出力ディレクトリ
  },
});