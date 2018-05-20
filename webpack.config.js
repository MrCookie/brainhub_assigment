const webpack = require('webpack');
const path = require('path');
// React v.16 uses some newer JS functionality, so to ensure everything
// works across all browsers, we're adding babel-polyfill
require('babel-polyfill');

module.exports = {
  entry: [
    './client/src/index.js'
  ],
  module: {
    loaders: [
      { 
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader?modules=true' ]
       },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ["es2015", "stage-0", "react"]
            }
          }
        ],
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve('./'),
      path.resolve('./node_modules'),
      path.resolve('./client/node_modules'),
    ],
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.join(__dirname, './client/public'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devtool: 'cheap-eval-source-map',
  devServer: {
    contentBase: './',
    hot: true,
    historyApiFallback: true
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
