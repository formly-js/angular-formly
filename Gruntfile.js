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
			build: ['.tmp/**/*', 'dist/**/*']
		},
		jshint: {
			src: ['src/**/*.js']
		},
		watch: {
			livereload: {
				files: ['<%= formlyConfig.base %>/**/*.{js,html}'],
				options: {
					livereload: '<%= formlyConfig.livereloadport %>'
				}
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
			commonCopyPatterns.push('!**/formly-template-config.js');
		}

		config.copy[target] = {
			files: [
				{
					expand: true,
					cwd: '<%= formlyConfig.base %>/',
					src: [target + '/**/*.*'],
					dest: preBuiltDest
				},
				{
					expand: true,
					cwd: '<%= formlyConfig.base %>/common',
					src: commonCopyPatterns,
					dest: preBuiltDest
				}
			]
		};

		config.ngtemplates[target] = {
			cwd: preBuiltDest + '/' + target + '/',
			src: [
				'fields/**/*.html'
			],
			dest: templatesFile,
			options: {
				module: 'formly.render',
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
			}
		};

		config.concat[target] = {
			src: [preBuiltDest + '/modules/**/*.js', preBuiltDest + '/**/*.js'],
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
	buildTasks.unshift('clean:build');
	buildTasks.push('copy:deploy');

	grunt.registerTask('build', buildTasks);

	grunt.registerTask('default', ['build']);
};
