/*
 * grunt-bower-task
 * https://github.com/yatskevich/grunt-bower-task
 *
 * Copyright (c) 2012-2013 Ivan Yatskevich
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      all: [ 'Gruntfile.js', 'tasks/**/*.js', 'test/**/*_test.js', 'specs/**/*.js' ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    bower: {
      install: {
        options: {
          cleanTargetDir: true,
          cleanBowerDir: true,
          install: true,
          copy: true
        }
      },
      cleanup: {
        options: {
          cleanTargetDir: true,
          cleanBowerDir: true,
          install: false,
          copy: false
        }
      }
    },

    nodeunit: {
      tests: ['test/*_test.js']
    },

    simplemocha: {
      options: {
        timeout: '2s',
        reporter: 'nyan'
      },

      all: { src: ['specs/**/*.js'] }
    }


  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('test', ['jshint', 'nodeunit', 'simplemocha']);

  grunt.registerTask('default', ['test']);

};
