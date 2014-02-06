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
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-gh-pages');

	grunt.registerTask('publish', [
		'gh-pages'
	]);

	grunt.registerTask('dev', [
		'connect:dev'
	]);
};