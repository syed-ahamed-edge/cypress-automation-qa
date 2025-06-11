const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@common': path.resolve(__dirname, 'cypress/support/common'),
      '@pages': path.resolve(__dirname, 'cypress/support/pages'),
      '@selectors': path.resolve(__dirname, 'cypress/support/selectors'),
      '@utils': path.resolve(__dirname, 'cypress/support/utils'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
};
