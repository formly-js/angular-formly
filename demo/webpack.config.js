var path = require('path');
var fs = require('fs');
var webpack = require('webpack');

var packageJsonString = fs.readFileSync('../package.json', 'utf8');
var packageJson = JSON.parse(packageJsonString);

module.exports = {
  entry: './app',
  output: {
    filename: 'bundle.js',
    path: __dirname
  },

  stats: {
    colors: true,
    reasons: true
  },

  devtool: 'eval',

  plugins: [
    new webpack.DefinePlugin({
      ON_DEV: true,
      ON_TEST: false,
      VERSION: JSON.stringify(packageJson.version)
    })
  ],


  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['shared', 'node_modules', 'bower_components'],
    alias: {
      // sadly have to do this because formly's trying to load it's version of angular
      // which is different from the one in the demo folder... Nesting with node_modules
      // and requiring files outside of this is a little odd... Pretty sure that nobody
      // else will have to do this!
      angular: path.join(__dirname, '/node_modules/angular/angular'),
      'angular-fix': path.join(__dirname, '../src/angular-fix'),
      'angular-formly': path.join(__dirname, '../src'),
      stateUtils: path.join(__dirname, '/app/shared/ngCommon/services/stateUtils')
    }
  },

  module: {
    loaders: [
      {test: /\.css$/, loader: 'style!css'},
      {test: /\.html$/, loader: 'raw', exclude: /node_modules/},
      {test: /\.json$/, loader: 'json'},
      {test: /\.js$/, loader: '6to5!jshint', exclude: /node_modules|dist/},
      {test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader?name=/res/[name].[ext]?[hash]'}
    ]
  }
};
