/* eslint-env node */
require('argv-set-env')();
const path = require('path');

process.env.NODE_ENV = process.env.NODE_ENV || 'test';

const coverage = process.env.COVERAGE === 'true';
const ci = process.env.CI;
if (coverage) {
  console.log('-- recording coverage --'); // eslint-disable-line no-console
}

const webpackConfig = require('./webpack.config.es6');
const entry = path.join(webpackConfig.context, webpackConfig.entry);
const preprocessors = {};
preprocessors[entry] = ['webpack'];

module.exports = function(config) {
  config.set({
    basePath: './',
    frameworks: ['sinon-chai', 'chai', 'mocha', 'sinon'],
    files: [
      'node_modules/lodash/lodash.js',
      'node_modules/api-check/dist/api-check.js',
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      entry
    ],
    preprocessors,
    reporters: getReporters(),
    webpack: webpackConfig,
    webpackMiddleware: {noInfo: true},
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
    browserNoActivityTimeout: 180000
  });
};

function getReporters() {
  const reps = ['progress'];
  if (coverage) {
    reps.push('coverage');
  }
  return reps;
}
