module.exports = {
  module: {
    rules: [
      {
        loader: require.resolve('css-loader'),
        options: {
          importLoaders: 1,
          modules: false,
        },
      },
    ],
  },
};
