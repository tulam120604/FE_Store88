module.exports = {
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/",
        destination: "/products",
        permanent: true,
      },
      // Wildcard path matching
      {
        source: "/blog/:slug",
        destination: "/news/:slug",
        permanent: true,
      },
    ];
  },
  async rewrite() {
    return [
      {
        source: "/api/:path*",
        destination: "https://be-node-js.vercel.app/v1/:path*",
      },
    ];
  },
  experimental: {
    appDir: true,
  },
};
