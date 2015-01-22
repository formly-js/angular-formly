/*
 * grunt-angular-templates
 * https://github.com/ericclemmons/grunt-angular-templates
 *
 * Copyright (c) 2013 Eric Clemmons
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    clean: {
      tests: 'tmp'
    },
    copy: {
      tmp: {
        files: [{
          expand: true,
          cwd: 'test/fixtures',
          src: ['usemin.html', 'usemin/*'],
          dest: 'tmp/'
        }]
      }
    },
    nodeunit: {
      tests: ['test/*.js']
    },
    watch: {
      tests: '<%= nodeunit.tests %>',
      tasks: 'default'
    },
    jshint: {
      all: ['Gruntfile.js', 'tasks/**/*.js', '<%= nodeunit.tests %>'],
      options: {
        jshintrc: '.jshintrc',
      }
    },
    concat: {
      custom_concat: {
        src: 'test/fixtures/one.html',
        dest: 'tmp/custom_concat_combined.js',
        options: {
          separator: '\n\n'
        }
      }
    },
    usemin: {
      html: 'tmp/usemin.html'
    },
    useminPrepare: {
      html: 'test/fixtures/usemin.html',
      options: {
        dest: 'tmp',
        staging: 'tmp'
      }
    },
    cssmin: {},

    // All supported examples should be here
    ngtemplates: {
      // Change `angular` namespace to something else
      custom_angular: {
        src: ['test/fixtures/one.html', 'test/fixtures/two/**/*.html'],
        dest: 'tmp/custom_angular.js',
        options: {
          angular: 'myAngular'
        }
      },

      // Custom CommonJS bootstrapper
      custom_bootstrap: {
        src: ['test/fixtures/one.html', 'test/fixtures/two/**/*.html'],
        dest: 'tmp/custom_bootstrap.js',
        options: {
          bootstrap: function(module, script) {
            return 'module.exports = function($templateCache) {\n' + script + '\n};\n';
          }
        }
      },

      // Append dest to existing concat target
      custom_concat: {
        src: ['test/fixtures/one.html', 'test/fixtures/two/**/*.html'],
        dest: 'tmp/custom_concat.js',
        options: {
          concat: 'custom_concat'
        }
      },

      custom_usemin: {
        src: ['test/fixtures/one.html', 'test/fixtures/two/**/*.html'],
        dest: 'tmp/custom_concat_usemin.js',
        options: {
          usemin: 'usemin/all.js'
        }
      },

      custom_usemin_not_found: {
        src: ['test/fixtures/one.html', 'test/fixtures/two/**/*.html'],
        dest: 'tmp/custom_concat_usemin_not_found.js',
        options: {
          usemin: 'usemin/not_found.js'
        }
      },

      html5: {
        src: ['test/fixtures/html5.html'],
        dest: 'tmp/html5.js'
      },

      // Minify the HTML
      custom_htmlmin: {
        src: ['test/fixtures/one.html', 'test/fixtures/two/**/*.html'],
        dest: 'tmp/custom_htmlmin.js',
        options: {
          htmlmin: {
            collapseBooleanAttributes:      true,
            collapseWhitespace:             true,
            removeAttributeQuotes:          true,
            removeComments:                 true,
            removeEmptyAttributes:          true,
            removeRedundantAttributes:      true,
            removeScriptTypeAttributes:     true,
            removeStyleLinkTypeAttributes:  true
          }
        }
      },

      missing_htmlmin: {
        src: ['test/fixtures/one.html', 'test/fixtures/two/**/*.html'],
        dest: 'tmp/missing_htmlmin.js',
        options: {
          htmlmin: null
        }
      },

      // Minify the HTML, but using another tasks' settings
      task_htmlmin: {
        src: ['test/fixtures/one.html', 'test/fixtures/two/**/*.html'],
        dest: 'tmp/task_htmlmin.js',
        options: {
          htmlmin: '<%= ngtemplates.custom_htmlmin.options.htmlmin %>'
        }
      },

      // Default `module` option to the sub-task name (`default_module`)
      default_module: {
        src: ['test/fixtures/one.html', 'test/fixtures/two/**/*.html'],
        dest: 'tmp/default_module.js'
      },

      // Customize angular module
      custom_module: {
        src: ['test/fixtures/one.html', 'test/fixtures/two/**/*.html'],
        dest: 'tmp/custom_module.js',
        options: {
          module: 'customModule'
        }
      },

      // Customize angular module
      callback_module: {
        src: ['test/fixtures/one.html', 'test/fixtures/two/**/*.html'],
        dest: 'tmp/callback_module.js',
        options: {
          module: function(url, options) {
            return url.split('/').join('.');
          },
          url: function(file) {
            return file.replace('.html', '');
          }
        }
      },

      // Customize template URL prefix
      custom_prefix: {
        src: ['test/fixtures/one.html', 'test/fixtures/two/**/*.html'],
        dest: 'tmp/custom_prefix.js',
        options: {
          prefix: '/static'
        }
      },

      // Customize template source
      custom_source: {
        src: ['test/fixtures/one.html', 'test/fixtures/two/**/*.html'],
        dest: 'tmp/custom_source.js',
        options: {
          source: function(source, url) {
            return "<!-- Template: " + url + " -->\n" + source;
          }
        }
      },

      // Module should be new & have [] defined
      standalone: {
        src: ['test/fixtures/one.html', 'test/fixtures/two/**/*.html'],
        dest: 'tmp/standalone.js',
        options: {
          standalone: true
        }
      },

      // URLs should match path exactly
      full_url: {
        src: ['test/fixtures/one.html', 'test/fixtures/two/**/*.html'],
        dest: 'tmp/full_url.js'
      },

      // URLs should match path, sans the `cwd`
      relative_url: {
        cwd: 'test/fixtures',
        src: ['one.html', 'two/**/*.html'],
        dest: 'tmp/relative_url.js'
      },

      // Customize URLs to not have an extension
      custom_url:  {
        src: ['test/fixtures/one.html', 'test/fixtures/two/**/*.html'],
        dest: 'tmp/custom_url.js',
        options: {
          url: function(url) {
            return url.replace('.html', '');
          }
        }
      },

      // Empty file
      empty_file: {
        src: 'test/fixtures/empty.html',
        dest: 'tmp/empty_file.js'
      },

      // undefined file
      undefined_file: {
        src: 'test/fixtures/undefined.html',
        dest: 'tmp/undefined_file.js'
      }
    }
  });

  // Load local tasks.
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-usemin');

  grunt.registerTask('default', ['jshint', 'clean', 'copy', 'useminPrepare', 'ngtemplates', 'concat', 'uglify', 'cssmin', 'usemin', 'nodeunit']);
};
