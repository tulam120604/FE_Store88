module.exports = {
    async redirects() {
      return [
        // Basic redirect
        {
          source: '/',
          destination: '/products',
          permanent: true,
        },
        // Wildcard path matching
        {
          source: '/blog/:slug',
          destination: '/news/:slug',
          permanent: true,
        },
      ]
    },
    experimental : {
      appDir : true
    }
  }