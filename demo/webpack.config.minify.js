var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var deepExtend = require('deep-extend');

var packageJsonString = fs.readFileSync('../package.json', 'utf8');
var packageJson = JSON.parse(packageJsonString);

var originalConfig = require('./webpack.config');
var copyOfOriginal = deepExtend({}, originalConfig);

copyOfOriginal.plugins = copyOfOriginal.plugins.concat([
  new webpack.DefinePlugin({
    ON_DEV: false,
    ON_TEST: false,
    VERSION: JSON.stringify(packageJson.version)
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.AggressiveMergingPlugin(),
  new webpack.optimize.UglifyJsPlugin()
]);

var ngAnnotateLoader = path.join(__dirname, '../loaders/ng-annotate.js');

copyOfOriginal.module.loaders[3].loader = ngAnnotateLoader + '!6to5!jshint';

module.exports = deepExtend(copyOfOriginal, {
  devtool: null,

  resolveLoader: {
    modulesDirectories: ['loaders', 'node_modules']
  }
});
