module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/visao-geral",
        permanent: true,
      },
    ];
  },
};
