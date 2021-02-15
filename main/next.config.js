const withPWA = require("next-pwa");

module.exports = withPWA({
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