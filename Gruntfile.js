'use strict';
var _ = require('lodash-node');

module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);
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
			deploy: {
				expand: true,
				cwd: '.tmp/',
				src: '**/*-built/**/*.*',
				dest: 'dist/',
				flatten: true,
				filter: 'isFile',
			}
		},
		ngtemplates: {},
		concat: {},
		ngAnnotate: {},
		uglify: {}
	};

	// targets build config (because they're pretty much identical)
	var targets = ['vanilla', 'bootstrap', 'no-template'];

	_.each(targets, function(target) {
		var tmp = '.tmp/' + target;
		var noTemplates = target === 'no-template';

		var preBuiltDest = tmp + '-build-prep';
		var builtDest = tmp + '-built';

		var templatesFile = preBuiltDest + '/formly-templates.js';
		var targetFilename = 'formly.' + target;
		if (noTemplates) {
			targetFilename = 'formly';
		}
		var concatFile = builtDest + '/' + targetFilename + '.js';
		var uglifyFile = builtDest + '/' + targetFilename + '.min.js';

		var commonCopyPatterns = ['**/*.*']
		if (noTemplates) {
			commonCopyPatterns.push('!**/formly-config-templates.js');
		}

		config.copy[target] = {
			files: [
				{
					expand: true,
					cwd: '<%= formlyConfig.base %>/',
					src: [target + '/**/*.*', '!**/*Spec.js'],
					dest: preBuiltDest
				},
				{
					expand: true,
					cwd: '<%= formlyConfig.base %>/common',
					src: commonCopyPatterns.concat(['!**/*Spec.js']),
					dest: preBuiltDest
				}
			]
		};

		var ngtemplatesOptions = {
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
		};

		config.ngtemplates[target] = {
			options: ngtemplatesOptions,
			files: [
				{
					cwd: preBuiltDest + '/' + target + '/',
					src: [ 'fields/**/*.html' ],
					dest: templatesFile
				},
				{
					cwd: preBuiltDest + '/',
					src: [ 'directives/**/*.html' ],
					dest: templatesFile
				}
			]
		};

		config.concat[target] = {
			src: [preBuiltDest + '/modules/**/*.js', preBuiltDest + '/providers/formly-config.js', preBuiltDest + '/**/*.js'],
			dest: concatFile
		};

		config.ngAnnotate[target] = {
			src: concatFile,
			dest: concatFile
		};

		config.uglify[target] = {
			src: concatFile,
			dest: uglifyFile,
			options: {
				mangle: true,
				sourceMap: true
			}
		};
	});


	// Pass config to grunt
	grunt.initConfig(config);

	grunt.registerTask('publish', [
		'gh-pages'
	]);

	grunt.registerTask('dev', [
		'connect:dev',
		'watch'
	]);

	// the code below creates tasks for build:{{target}} (i.e. build:bootstrap)
	_.each(targets, function(target) {
		grunt.registerTask('build:' + target, [
			'copy:' + target,
			'ngtemplates:' + target,
			'concat:' + target,
			'ngAnnotate:' + target,
			'uglify:' + target
		]);
	});


	var buildTasks = _.map(targets, function(target) {
		return 'build:' + target;
	});
	buildTasks = ['jshint', 'mocha'].concat(buildTasks).concat(['clean:dist', 'copy:deploy']);

	grunt.registerTask('build', buildTasks);

	grunt.registerTask('build:onlyBootstrap', [
		'clean:tmp',
		'build:bootstrap',
		'copy:deploy'
	]);

	grunt.registerTask('default', ['build']);
};
