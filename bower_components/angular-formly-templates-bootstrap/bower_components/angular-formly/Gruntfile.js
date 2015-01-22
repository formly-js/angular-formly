'use strict';
var _ = require('lodash-node');

module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	var tmp = '.tmp/';
	var preBuiltDest = tmp + 'build-prep';
	var builtDest = tmp + 'built';
	var templatesFile = preBuiltDest + '/formly-templates.js';
	var targetFilename = 'formly';
	var concatFile = builtDest + '/' + targetFilename + '.js';
	var uglifyFile = builtDest + '/' + targetFilename + '.min.js';

	var config = {
		pkg: grunt.file.readJSON('package.json'),
		formlyConfig: {
			hostname: 'localhost', // change to 0.0.0.0 to listen on all connections
			base: 'src',
			demo: 'demo',
			dist: 'dist',
			port: 4000,
			livereloadport: 35701
		},
		connect: {
			dev: {
				options: {
					hostname: '<%= formlyConfig.hostname %>',
					port: '<%= formlyConfig.port %>',
					base: '<%= formlyConfig.demo %>',
					livereload: '<%= formlyConfig.livereloadport %>'
				}
			}
		},
		'gh-pages': {
			options: {
				base: '<%= formlyConfig.demo %>'
			},
			src: ['**']
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
			livereload: {
				files: ['<%= formlyConfig.dist %>/**/*.{js,html}', '<%= formlyConfig.demo %>/**/*.{js,css,html}'],
				options: {
					livereload: '<%= formlyConfig.livereloadport %>'
				}
			},
			build: {
				files: ['<%= formlyConfig.base %>/**/*.{js,html}'],
				tasks: ['build:onlyBootstrap']
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
				filter: 'isFile',
			}
		},
		concat: {
			default: {
				src: [
					preBuiltDest + '/modules/*.js',
					preBuiltDest + '/directives/*.js',
					preBuiltDest + '/providers/*.js',
					preBuiltDest + '/*.js'],
				dest: concatFile
			}
		},
		ngtemplates: {
			default: {
				options: {
					module: 'formly.render',
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
					},
					{
						cwd: preBuiltDest + '/',
						src: [ 'directives/**/*.html' ],
						dest: templatesFile
					}
				]
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
		}
	};

	// Pass config to grunt
	grunt.initConfig(config);

	grunt.registerTask('publish', [
		'gh-pages'
	]);

	grunt.registerTask('dev', [
		'build',
		'connect:dev',
		'watch'
	]);

	grunt.registerTask('build', [
		'jshint',
		'mocha',
		'clean:tmp',
		'copy:build',
		'ngtemplates',
		'concat',
		'ngAnnotate',
		'uglify',
		'clean:dist',
		'copy:dist'
	]);

	grunt.registerTask('default', ['build']);
};
