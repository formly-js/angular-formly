/*
 * grunt-angular-templates
 * https://github.com/ericclemmons/grunt-angular-templates
 *
 * Copyright (c) 2013 Eric Clemmons
 * Licensed under the MIT license.
 */

'use strict';

var Path = require('path');

/**
 * Utility for modifying other grunt tasks
 * @param {Object} grunt Grunt global object
 */
var Appender = function(grunt) {

  /**
   * Append compiled templates path to concat target's src(s)
   * @param  {String}   target Concat target
   * @param  {Object}   file   Grunt File object for compiled templates
   * @param  {Function} filter (Optional) Filter to reduce matching src(s)
   * @return {Array}           Modified concat[target].files
   */
  this.concatFiles = function(target, file, filter) {
    // Apparently concat targets are normalized if paths
    if (process.platform === 'win32') {
      target = target.replace(/\//g, '\\');
    }

    var config = grunt.config(['concat', target]);

    if (!config) {
      grunt.log.warn('Concat target not found: ' + target.red);

      return false;
    }

    // Grunt handles files 400 different ways.  Not me.
    var files = grunt.task.normalizeMultiTaskFiles(config)
      // Only work on the original src/dest, since files.src is a [GETTER]
      .map(function(files) {
        return files.orig;
      })
    ;

    files
      // Optionally filter original src/dest(s)
      .filter(filter || function(files) {
        // Default to only appending to JS targets
        return files.src.filter(function(file) {
          return '.js' === file.substr(-3);
        }).length;
      })
      // Append compiled templates file to src
      .forEach(function(files) {
        files.src.push(file.dest);
      })
    ;

    return files;
  };

  /**
   * Append compiled templates to matching usemin output path
   * @param  {String} path   Path from <!-- build:js --> tag
   * @param  {Object} file   Grunt File object for compiled templates
   * @return {Array}  files  Modified concat.generated.files
   */
  this.concatUseminFiles = function(path, file) {
    var config = grunt.config('uglify.generated');

    if (!config) {
      grunt.log.warn('Usemin has not created ' + 'uglify.generated'.red + ' yet!');

      return false;
    }

    // Find uglify destination(s) matching output path
    var matches = grunt.task.normalizeMultiTaskFiles(config)
      .map(function(files) {
        return files.orig;
      })
      .filter(function(files) {
        return Path.normalize(path) === files.dest.substr(-path.length);
      })
    ;

    // *Something* should've matched
    if (!matches.length) {
      grunt.log.warn('Could not find usemin.generated path matching: ' + path.red);

      return false;
    }

    var match = matches.shift();

    // Only support one match
    if (matches.length > 1) {
      grunt.log.warn('Multiple matches for ' + path.yellow + '.  Using ' + match.dest);
    }

    var uglified = match.src.pop();

    // Finally, modify concat target sourced by matching uglify target
    return this.concatFiles('generated', file, function(files) {
      return uglified === files.dest;
    });
  };

  /**
   * Save Grunt Files array to existing grunt concat target
   * @param  {String} target Concat target
   * @param  {Array}  files  Modified concat[target].files
   * @return {Array}         files
   */
  this.save = function(target, files) {
    grunt.config(['concat', target], {
      files:    files || grunt.config(['concat', target, 'files']),
      options:  grunt.config(['concat', target, 'options']) || {}
    });

    return files;
  };
};

module.exports = Appender;
