'use strict';
var _ = require('lodash-node');

module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	var tmp = '.tmp/';
	var preBuiltDest = tmp + 'build-prep';
	var builtDest = tmp + 'built';
	var templatesFile = preBuiltDest + '/formly-templates.js';
	var targetFilename = 'angular-formly-templates-bootstrap';
	var concatFile = builtDest + '/' + targetFilename + '.js';
	var uglifyFile = builtDest + '/' + targetFilename + '.min.js';

	var config = {
		pkg: grunt.file.readJSON('package.json'),
		formlyConfig: {
			base: 'src',
			dist: 'dist'
		},
		clean: {
			tmp: '.tmp/**/*',
			dist: 'dist/**/*'
		},
		jshint: {
			src: ['src/**/*.js']
		},
		mocha: {
			all: {
				src: ['tests/testrunner.html']
			},
			options: {
				run: true
			}
		},
		watch: {
			build: {
				files: ['<%= formlyConfig.base %>/**/*.{js,html}'],
				tasks: ['build']
			}
		},

		copy: {
			build: {
				files: [
					{
						expand: true,
						cwd: '<%= formlyConfig.base %>/',
						src: ['**/*.*', '!**/*Spec.js'],
						dest: preBuiltDest
					}
				]
			},
			dist: {
				expand: true,
				cwd: '.tmp/',
				src: '**/built/**/*.*',
				dest: 'dist/',
				flatten: true,
				filter: 'isFile'
			}
		},
		ngtemplates: {
			default: {
				options: {
					module: 'formlyBootstrap',
					append: true,
					htmlmin: {
						collapseBooleanAttributes: true,
						collapseWhitespace: true,
						removeAttributeQuotes: true,
						removeComments: true,
						removeEmptyAttributes: true,
						removeRedundantAttributes: false,
						removeScriptTypeAttributes: true,
						removeStyleLinkTypeAttributes: true
					}
				},
				files: [
					{
						cwd: preBuiltDest + '/',
						src: [ 'fields/**/*.html' ],
						dest: templatesFile
					}
				]
			}
		},
		concat: {
			default: {
				src: [preBuiltDest + '/**/*.js'],
				dest: concatFile
			}
		},
		ngAnnotate: {
			default: {
				src: concatFile,
				dest: concatFile
			}
		},
		uglify: {
			default: {
				src: concatFile,
				dest: uglifyFile,
				options: {
					mangle: true,
					sourceMap: true
				}
			}
		},
    umd: {
      all: {
        options: {
          src: concatFile,
          template: __dirname + '/umd.hbs',
          objectToExport: '"formlyBootstrap"'
        }
      }
    }
	};

	// Pass config to grunt
	grunt.initConfig(config);

	grunt.registerTask('dev', [
		'build',
		'connect:dev',
		'watch'
	]);

	grunt.registerTask('build', [
		'jshint',
		//'mocha',
		'clean:tmp',
		'copy:build',
		'ngtemplates',
		'concat',
		'ngAnnotate',
    'umd:all',
		'uglify',
		'clean:dist',
		'copy:dist'
	]);

	grunt.registerTask('default', ['build']);
};
