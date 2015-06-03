/* eslint-env node */
// Karma configuration
var ci = process.env.NODE_ENV === 'test:ci';
var path = require('path');

var webpackConfig = require('./webpack.config');
var entry = path.join(webpackConfig.context, webpackConfig.entry);


var reporters = ['progress'];

var preprocessors = {};
preprocessors[entry] = ['sourcemap', 'webpack'];

if (process.env.COVERAGE === 'true') {
  console.log('-- Adding coverage reporter --');
  preprocessors[entry].push('coverage');
  reporters.push('coverage');
}

var files = [
  './node_modules/lodash/index.js',
  './node_modules/api-check/dist/api-check.js',
  './node_modules/angular/angular.js',
  './node_modules/angular-mocks/angular-mocks.js',
  './node_modules/chai/chai.js',
  './node_modules/sinon-chai/lib/sinon-chai.js',
  entry
];

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',
    frameworks: ['mocha', 'sinon'],
    files: files,
    exclude: [],

    preprocessors: preprocessors,

    reporters: reporters,

    webpack: webpackConfig,

    coverageReporter: {
      reporters: [
        {type: 'lcov', dir: 'coverage/', subdir: '.'},
        {type: 'json', dir: 'coverage/', subdir: '.'}
      ]
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: !ci,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ci ? ['Firefox'] : ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: ci,

    browserNoActivityTimeout: 180000,

    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-sinon',
      'karma-chai',
      'karma-coverage',
      'karma-sourcemap-loader',
      'karma-chrome-launcher',
      'karma-firefox-launcher'
    ]
  });
};
