/* eslint-env node */
process.env.NODE_ENV = process.env.NODE_ENV || 'test';
var coverage = process.env.COVERAGE === 'true';
if (coverage) {
  console.log('-- recording coverage --');
}
var ci = process.env.NODE_ENV === 'test:ci';
var path = require('path');

var webpackConfig = getTestWebpackConfig();
var entry = path.join(webpackConfig.context, webpackConfig.entry);

module.exports = function(config) {
  config.set({
    basePath: './',
    frameworks: ['sinon-chai', 'chai', 'mocha', 'sinon'],
    files: [
      './node_modules/lodash/index.js',
      './node_modules/api-check/dist/api-check.js',
      './node_modules/angular/angular.js',
      './node_modules/angular-mocks/angular-mocks.js',
      entry
    ],
    exclude: [],
    preprocessors: {
      './src/**/*.test.js': ['webpack']
    },
    reporters: getReporters(),
    webpack: webpackConfig,
    coverageReporter: {
      reporters: [
        {type: 'lcov', dir: 'coverage/', subdir: '.'},
        {type: 'json', dir: 'coverage/', subdir: '.'},
        {type: 'text-summary'}
      ]
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: !ci,
    browsers: ['Firefox'],
    singleRun: ci,
    browserNoActivityTimeout: 180000,
    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-sinon-chai',
      'karma-sinon',
      'karma-chai',
      'karma-coverage',
      'karma-chrome-launcher',
      'karma-firefox-launcher'
    ]
  });
};

function getReporters() {
  var reps = ['progress'];
  if (coverage) {
    reps.push('coverage');
  }
  return reps;
}

function getTestWebpackConfig() {
  var testWebpackConfig = require('./webpack.config');

  if (coverage) {
    // I can't think of a more appropriate name that matches the file naming convention... meh...
    var testUtilsRegex = /test\.utils\.js/;

    // only run this through test files
    testWebpackConfig.module.loaders[1].exclude = /node_modules|^((?!\.test\.).)*$/i;
    testWebpackConfig.module.loaders.push({
      test: /^((?!\.test\.).)*$/i, // all files not containing ".test."
      include: here('src'),
      loader: 'isparta!ng-annotate',
      exclude: testUtilsRegex
    });

    testWebpackConfig.module.loaders.push({
      test: testUtilsRegex,
      include: here('src'),
      loader: 'babel!eslint'
    });
  }

  return testWebpackConfig;
}


function here(p) {
  return path.join(__dirname, p || '');
}
