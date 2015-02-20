// Karma configuration
var deepExtend = require('deep-extend');
var path = require('path');


module.exports = getConfig();
module.exports.getConfig = getConfig;

function getConfig(context) {
  context = context || 'dev';
  var ci = context === 'ci';

  var webpackConfig = require('./webpack.config').getConfig(ci ? 'test:ci' : 'test');
  var testConfig = deepExtend({}, webpackConfig, {
    watch: !ci,
    entry: './index.test.js'
  });
  delete testConfig.externals.angular; // need angular in test context
  var entry = path.join(testConfig.context, testConfig.entry);
  var preprocessors = {};
  preprocessors[entry] = ['webpack'];

  return function(config) {
    config.set({

      // base path that will be used to resolve all patterns (eg. files, exclude)
      basePath: './',
      frameworks: ['mocha'],
      files: [entry],
      exclude: [],


      // preprocess matching files before serving them to the browser
      // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
      preprocessors: preprocessors,

      webpack: testConfig,


      // test results reporter to use
      // possible values: 'dots', 'progress'
      // available reporters: https://npmjs.org/browse/keyword/karma-reporter
      reporters: ['progress'],


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
        require('karma-webpack'),
        'karma-mocha',
        'karma-chai',
        'karma-chrome-launcher',
        'karma-firefox-launcher'
      ]
    });
  };
}
