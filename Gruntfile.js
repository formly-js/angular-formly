'use strict';
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		connect: {
			dev: {
				options: {
					port: 4000,
					base: 'src',
					keepalive: true
				},
			}
		},
		'gh-pages': {
			options: {
				base: 'src'
			},
			src: ['**']
		},
		clean: {
			build: ['.tmp/**/*', 'dist/**/*']
		},
		copy: {
			build: {
				files: [
					{
						expand: true,
						cwd: 'src/',
						src: ['directives/formly*.*', 'modules/formly*.*', '!.jshintrc'],
						dest: '.tmp/'
					}
				]
			},
			deploy: {
				files: [{
					expand: true,
					cwd: '.tmp',
					src: ['formly.js', 'formly.min.js', 'formly.min.map'],
					dest: 'dist/'
				}]
			}
		},
		concat: {
			build: {
				// specifing files so that they are added in this order
				src: ['.tmp/modules/formly*.js', '.tmp/directives/formly*.js', '.tmp/formly*.js'],
				dest: '.tmp/formly.js'
			}
		},
		uglify: {
			build: {
				src: '.tmp/formly.js',
				dest: '.tmp/formly.min.js'
			},
			options: {
				mangle: true,
				sourceMap: true
			}
		},
		ngtemplates: {
			build: {
				cwd: '.tmp/',
				src: [
					'**/formly*.html'
				],
				dest: '.tmp/formly-templates.js',
				options: {
					module: 'formly.render',
					htmlmin: {
						collapseBooleanAttributes: true,
						collapseWhitespace: true,
						removeAttributeQuotes: true,
						removeComments: true, // Only if you don't use comment directives!
						removeEmptyAttributes: true,
						removeRedundantAttributes: true,
						removeScriptTypeAttributes: true,
						removeStyleLinkTypeAttributes: true
					}
				}
			}
		},
		ngmin: {
			build: {
				src: '.tmp/formly.js',
				dest: '.tmp/formly.js'
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-gh-pages');
	grunt.loadNpmTasks('grunt-angular-templates');
	grunt.loadNpmTasks('grunt-ngmin');

	grunt.registerTask('publish', [
		'gh-pages'
	]);

	grunt.registerTask('dev', [
		'connect:dev'
	]);

	grunt.registerTask('build', [
		'clean:build',
		'copy:build',
		'ngtemplates:build',
		'concat:build',
		'ngmin:build',
		'uglify:build',
		'copy:deploy'
	]);
};