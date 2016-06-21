/* eslint-disable key-spacing */

require('./loadenv');

const path = require('path');
const webpack = require('webpack');
const env = require('./config/env');


function serialize(data) {
  const serializedData = {};
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      switch (typeof data[key]) {
        case 'string':
          serializedData[key] = `\'${data[key]}\'`;
          break;

        case 'object':
          serializedData[key] = JSON.stringify(data[key]);
          break;

        default:
          serializedData[key] = '';
          break;
      }
    }
  }
  return serializedData;
}

module.exports = {
  entry: {
    app: [
      './src/app.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'bin'),
    publicPath: '/',
    filename: 'app.bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel-loader'],
        include: path.join(__dirname, 'src'),
      },
    ],
  },
  debug: true,
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': serialize({
        NODE_ENV:     env,
        CHAT_HOST:    process.env.CHAT_HOST,
      }),
    }),
  ],
};
