module.exports = {
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/blog/1',
        permanent: true,
      },
    ]
  },
}
