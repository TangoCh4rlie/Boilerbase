module.exports = {
  devServer: {
    proxy: {
      'github': {
        target: 'https://github.com',
      },
    },
  },
};
