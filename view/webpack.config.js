'use strict';

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const traceFragment = require('macaca-ecosystem/lib/trace-fragment');

const pkg = require('./package');
const distDirName = 'dist';

module.exports = {
  entry: {
    [pkg.name]: path.resolve('src'),
  },

  output: {
    path: path.resolve(__dirname, distDirName),
    publicPath: `/${distDirName}`,
    filename: '[name].js',
  },

  resolve: {
    extensions: [
      '.js',
      '.jsx',
    ],
  },

  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      }, {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'less-loader',
          },
        ],
      }, {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      }, {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              symbolId: '[name]',
            },
          },
          {
            loader: 'svgo-loader',
          },
        ],
        include: [ path.resolve(__dirname, 'src', 'assets') ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new webpack.DefinePlugin({
      'process.env.VERSION': JSON.stringify(pkg.version),
      'process.env.traceFragment': traceFragment,
    }),
  ],

  devServer: {
    hot: true,
    static: {
      directory: __dirname,
    },
  },
};
