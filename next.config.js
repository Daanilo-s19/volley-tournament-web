module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/overview",
        permanent: true,
      },
    ];
  },
};
