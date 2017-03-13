const webpack = require('webpack')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
require('dotenv').config();

const sourcePath = path.join(__dirname, './src');
const buildPath = path.join(__dirname, './_build');

module.exports = {
  devtool: 'source-map',
  context: sourcePath,
  entry: {
    app:[
      path.join(__dirname, 'src/client/entry')
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: buildPath + '/script',
    publicPath: '/'
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx'
    ],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      sourcePath
    ]
  },
  module: {
    loaders : [
      {
        test: /\.jsx?$/,
        loaders: ['babel', 'eslint'],
        exclude: /node_modules/,
        include: './src'
      }
    ],
    rules: [
      {
        test: /\.css$|\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            { loader: 'css-loader' },
            { loader: 'postcss-loader' },
            { loader: 'sass-loader', options: {
              includePaths: [
                'node_modules'
              ]
            }
            }
          ]
        })
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('../styles/[name].main.css'),
    new HtmlWebpackPlugin({
      title: 'My App',
      filename: '../index.html',
      template:'client/index.html'
    }),
    new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: true, comments:false}),
    new webpack.EnvironmentPlugin([
      'CAROUSEL_API_URL',
      'NODE_ENV'
    ])
  ]
};
