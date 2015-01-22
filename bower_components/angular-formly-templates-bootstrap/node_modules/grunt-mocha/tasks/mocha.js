/*
 * grunt
 * https://github.com/cowboy/grunt
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 * http://benalman.com/about/license/
 *
 * Mocha task
 * Copyright (c) 2012 Kelly Miyashiro
 * Licensed under the MIT license.
 * http://benalman.com/about/license/
 */

'use strict';

// Nodejs libs.
var _             = require('lodash');
var util          = require('util');
var path          = require('path');
var EventEmitter  = require('events').EventEmitter;
var reporters     = require('mocha').reporters;
// Helpers
var helpers       = require('../support/mocha-helpers');

module.exports = function(grunt) {
  // External lib.
  var phantomjs = require('grunt-lib-phantomjs').init(grunt);

  var reporter;

  // Growl is optional
  var growl;
  try {
    growl = require('growl');
  } catch(e) {
    growl = function(){};
    grunt.verbose.write('Growl not found, \'npm install growl\' for Growl support');
  }

  // Get an asset file, local to the root of the project.
  var asset = path.join.bind(null, __dirname, '..');

  // Manage runners listening to phantomjs
  var phantomjsEventManager = (function() {
    var listeners = {};
    var suites = [];

    // Hook on Phantomjs Mocha reporter events.
    phantomjs.on('mocha.*', function(test) {
      var name, fullTitle, slow, err;
      var evt = this.event.replace('mocha.', '');

      if (evt === 'end') {
        phantomjs.halt();
      }

      // Expand test values (and façace the Mocha test object)
      if (test) {
        fullTitle = test.fullTitle;
        test.fullTitle = function() {
          return fullTitle;
        };

        slow = this.slow;
        test.slow = function() {
          return slow;
        };

        test.parent = suites[suites.length - 1] || null;

        err = test.err;
      }

      if (evt === 'suite') {
          suites.push(test);
      } else if (evt === 'suite end') {
          suites.pop(test);
      }

      // Trigger events for each runner listening
      for (name in listeners) {
        listeners[name].emit.call(listeners[name], evt, test, err);
      }
    });

    return {
      add: function(name, runner) {
        listeners[name] = runner;
      },
      remove: function(name) {
        delete listeners[name];
      }
    };
  }());

  // Built-in error handlers.
  phantomjs.on('fail.load', function(url) {
    phantomjs.halt();
    grunt.verbose.write('Running PhantomJS...').or.write('...');
    grunt.log.error();
    grunt.warn('PhantomJS unable to load "' + url + '" URI.', 90);
  });

  phantomjs.on('fail.timeout', function() {
    phantomjs.halt();
    grunt.log.writeln();
    grunt.warn('PhantomJS timed out, possibly due to a missing Mocha run() call.', 90);
  });

  // Debugging messages.
  phantomjs.on('debug', grunt.log.debug.bind(grunt.log, 'phantomjs'));

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('mocha', 'Run Mocha unit tests in a headless PhantomJS instance.', function() {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      // Output console.log calls
      log: false,
      // Mocha reporter
      reporter: 'Dot',
      // Default PhantomJS timeout.
      timeout: 5000,
      // Mocha-PhantomJS bridge file to be injected.
      inject: asset('phantomjs/bridge.js'),
      // Main PhantomJS script file
      phantomScript: asset('phantomjs/main.js'),
      // Explicit non-file URLs to test.
      urls: [],
      // Fail with grunt.warn on first test failure
      bail: false,
      // Log script errors as grunt errors
      logErrors: false,
      // Growl notification when tests pass.
      growlOnSuccess: true
    });

    // Output console messages if log == true
    if (options.log) {
      phantomjs.removeAllListeners(['console']);
      phantomjs.on('console', grunt.log.writeln);
    } else {
      phantomjs.off('console', grunt.log.writeln);
    }

    // Output errors on script errors
    if (options.logErrors) {
      phantomjs.on('error.*', function(error, stack) {
        var formattedStack = _.map(stack, function(frame) {
          return "    at " + (frame.function ? frame.function : "undefined") + " (" + frame.file + ":" + frame.line + ")";
        }).join("\n");
        grunt.fail.warn(error + "\n" + formattedStack, 3);
      });
    }

    var optsStr = JSON.stringify(options, null, '  ');
    grunt.verbose.writeln('Options: ' + optsStr);

    // Clean Phantomjs options to prevent any conflicts
    var PhantomjsOptions = _.omit(options, 'reporter', 'urls', 'log', 'bail');

    var phantomOptsStr = JSON.stringify(PhantomjsOptions, null, '  ');
    grunt.verbose.writeln('Phantom options: ' + phantomOptsStr);

    // Combine any specified URLs with src files.
    var urls = options.urls.concat(_.compact(this.filesSrc));

    // Remember all stats from all tests
    var testStats = [];

    // This task is asynchronous.
    var done = this.async();

    // Hijack console.log to capture reporter output
    var dest = this.data.dest;
    var output = [];
    var consoleLog = console.log;
    // Latest mocha xunit reporter sends to process.stdout instead of console
    var processWrite = process.stdout.write;


    // Only hijack if we really need to
    if (dest) {
      console.log = function() {
        consoleLog.apply(console, arguments);
        // FIXME: This breaks older versions of mocha
        // processWrite.apply(process.stdout, arguments);
        output.push(util.format.apply(util, arguments));
      };
    }

    // Process each filepath in-order.
    grunt.util.async.forEachSeries(urls, function(url, next) {
      grunt.log.writeln('Testing: ' + url);

      // create a new mocha runner façade
      var runner = new EventEmitter();
      phantomjsEventManager.add(url, runner);

      // Clear runner event listener when test is over
      runner.on('end', function() {
        phantomjsEventManager.remove(url);
      });

      // Set Mocha reporter
      var Reporter = null;
      if (reporters[options.reporter]) {
        Reporter = reporters[options.reporter];
      } else {
        // Resolve external reporter module
        var externalReporter;
        try {
          externalReporter = require.resolve(options.reporter);
        } catch (e) {
          // Resolve to local path
          externalReporter = path.resolve(options.reporter);
        }

        if (externalReporter) {
          try {
            Reporter = require(externalReporter);
          }
          catch (e) { }
        }
      }
      if (Reporter === null) {
        grunt.fatal('Specified reporter is unknown or unresolvable: ' + options.reporter);
      }
      reporter = new Reporter(runner);

      // Launch PhantomJS.
      phantomjs.spawn(url, {
        // Exit code to use if PhantomJS fails in an uncatchable way.
        failCode: 90,
        // Additional PhantomJS options.
        options: PhantomjsOptions,
        // Do stuff when done.
        done: function(err) {
          var stats = runner.stats;
          testStats.push(stats);

          if (err) {
            // Show Growl notice
            // @TODO: Get an example of this
            // growl('PhantomJS Error!');

            // If there was a PhantomJS error, abort the series.
            grunt.fatal(err);
            done(false);
          } else {
            // If failures, show growl notice
            if (stats.failures > 0) {
              var reduced = helpers.reduceStats([stats]);
              var failMsg = reduced.failures + '/' + reduced.tests +
                ' tests failed (' + reduced.duration + 's)';

              // Show Growl notice, if avail
              growl(failMsg, {
                image: asset('growl/error.png'),
                title: 'Failure in ' + grunt.task.current.target,
                priority: 3
              });

              // Bail tests if bail option is true
              if (options.bail) grunt.warn(failMsg);
            }

            // Process next file/url
            next();
          }
        }
      });
    },
    // All tests have been run.
    function() {
      if (dest) {
        // Restore console.log to original and write the output
        console.log = consoleLog;
        grunt.file.write(dest, output.join('\n'));
      }

      var stats = helpers.reduceStats(testStats);

      if (stats.failures === 0) {
        var okMsg = stats.tests + ' passed!' + ' (' + stats.duration + 's)';

        if (options.growlOnSuccess) {
          growl(okMsg, {
            image: asset('growl/ok.png'),
            title: okMsg,
            priority: 3
          });
        }

        grunt.log.ok(okMsg);

        // Async test pass
        done(true);

      } else {
        var failMsg = stats.failures + '/' + stats.tests + ' tests failed (' +
          stats.duration + 's)';

        // Show Growl notice, if avail
        growl(failMsg, {
          image: asset('growl/error.png'),
          title: failMsg,
          priority: 3
        });

        // Bail tests if bail option is true
        if (options.bail) {
          grunt.warn(failMsg);
        } else {
          grunt.log.error(failMsg);
        }

        // Async test fail
        done(false);
      }
    });
  });
};
