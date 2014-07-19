'use strict';
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		formlyConfig: {
			hostname: 'localhost', // change to 0.0.0.0 to listen on all connections
			base: 'src',
			port: 4000,
			livereloadport: 35701
		},
		connect: {
			dev: {
				options: {
					hostname: '<%= formlyConfig.hostname %>',
					port: '<%= formlyConfig.port %>',
					base: '<%= formlyConfig.base %>',
					livereload: '<%= formlyConfig.livereloadport %>'
				}
			}
		},
		'gh-pages': {
			options: {
				base: '<%= formlyConfig.base %>'
			},
			src: ['**']
		},
		clean: {
			build: ['.tmp/**/*'],
			dist: ['dist/**/*']
		},
		copy: {
			vanilla: {
				files: [
					{
						expand: true,
						cwd: '<%= formlyConfig.base %>/',
						src: ['directives/formly*.*', 'modules/formly*.*', 'providers/formly*.*', '!.jshintrc'],
						dest: '.tmp/'
					}
				]
			},
			bootstrap: {
				files: [
					{
						expand: true,
						cwd: '<%= formlyConfig.base %>/',
						src: ['directives/formly*.js', 'directives/bootstrap/formly*.html', 'modules/formly*.*', 'providers/formly*.*', '!.jshintrc'],
						dest: '.tmp/'
					}
				]
			},
			deploy: {
				files: [{
					expand: true,
					cwd: '.tmp/dist',
					src: ['formly*.*'],
					dest: 'dist/'
				}]
			}
		},
		concat: {
			build: {
				// specifing files so that they are added in this order
				src: ['.tmp/modules/formly*.js', '.tmp/directives/formly*.js', '.tmp/providers/formly*.js', '.tmp/formly*.js'],
				dest: '.tmp/formly.js'
			}
		},
		uglify: {
			vanilla: {
				src: '.tmp/dist/formly.js',
				dest: '.tmp/dist/formly.min.js'
			},
			bootstrap: {
				src: '.tmp/dist/formly.bootstrap.js',
				dest: '.tmp/dist/formly.bootstrap.min.js'
			},
			options: {
				mangle: true,
				sourceMap: true
			}
		},
		ngtemplates: {
			vanilla: {
				cwd: '.tmp/',
				src: [
					'directives/formly*.html'
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
						removeRedundantAttributes: false, //removing this as it can removes properties that can be used when styling
						removeScriptTypeAttributes: true,
						removeStyleLinkTypeAttributes: true
					}
				}
			},
			bootstrap: {
				cwd: '.tmp/',
				src: [
					'directives/bootstrap/formly*.html'
				],
				dest: '.tmp/formly-templates.js',
				options: {
					module: 'formly.render',
					url: function(url) {
						return url.replace('bootstrap/', '');
					},
					htmlmin: {
						collapseBooleanAttributes: true,
						collapseWhitespace: true,
						removeAttributeQuotes: true,
						removeComments: true, // Only if you don't use comment directives!
						removeEmptyAttributes: true,
						removeRedundantAttributes: false, //removing this as it can removes properties that can be used when styling
						removeScriptTypeAttributes: true,
						removeStyleLinkTypeAttributes: true
					}
				}
			}
		},
		ngmin: {
			vanilla: {
				src: '.tmp/formly.js',
				dest: '.tmp/dist/formly.js'
			},
			bootstrap: {
				src: '.tmp/formly.js',
				dest: '.tmp/dist/formly.bootstrap.js'
			}
		},
		watch: {
			livereload: {
				files: ['<%= formlyConfig.base %>/**/*.{js,html}'],
				options: {
					livereload: '<%= formlyConfig.livereloadport %>'
				}
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
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('publish', [
		'gh-pages'
	]);

	grunt.registerTask('dev', [
		'connect:dev',
		'watch'
	]);

	grunt.registerTask('build', [
		'clean:dist',
		'build:vanilla',
		'build:bootstrap'
	]);

	grunt.registerTask('build:vanilla', [
		'clean:build',
		'copy:vanilla',
		'ngtemplates:vanilla',
		'concat:build',
		'ngmin:vanilla',
		'uglify:vanilla',
		'copy:deploy'
	]);

	grunt.registerTask('build:bootstrap', [
		'clean:build',
		'copy:bootstrap',
		'ngtemplates:bootstrap',
		'concat:build',
		'ngmin:bootstrap',
		'uglify:bootstrap',
		'copy:deploy'
	]);
};