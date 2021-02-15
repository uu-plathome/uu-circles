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
    runtimeCaching: [
      {
        urlPattern:
          '^https://firebasestorage.googleapis.com/v0/b/uu-circle20.appspot.com/(.*)',
        handler: 'cacheFirst',
      },
    ]
  },
});