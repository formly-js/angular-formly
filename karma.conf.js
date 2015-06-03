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
    frameworks: ['mocha', 'sinon'],
    files: [
      './node_modules/lodash/index.js',
      './node_modules/api-check/dist/api-check.js',
      './node_modules/angular/angular.js',
      './node_modules/angular-mocks/angular-mocks.js',
      './node_modules/chai/chai.js',
      './node_modules/sinon-chai/lib/sinon-chai.js',
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
        {type: 'json', dir: 'coverage/', subdir: '.'}
      ]
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: !ci,
    browsers: ci ? ['Firefox'] : ['Chrome'],
    singleRun: ci,
    browserNoActivityTimeout: 180000,
    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-sinon',
      'karma-chai',
      'karma-coverage',
      'karma-coveralls',
      'karma-sourcemap-loader',
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
  if (process.env.COVERALLS_REPO_TOKEN) {
    console.log('-- adding report to coveralls --');
    reps.push('coveralls');
  }
  return reps;
}

function getTestWebpackConfig() {
  var testWebpackConfig = require('./webpack.config');

  if (coverage) {
    // I can't think of a more appropriate name that matches the file naming convention... meh...
    var testUtilsRegex = /test\.utils\.js/;

    testWebpackConfig.module.loaders[1].exclude = /node_modules|^((?!\.test\.).)*$/i; // only run this through test files
    testWebpackConfig.module.loaders.push({
      test: /^((?!\.test\.).)*$/i, // all files not containing ".test."
      include: here('src'),
      loader: 'ng-annotate!isparta',
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
