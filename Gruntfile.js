'use strict';
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		nodemon: {
			dev: {
				options: {
					file: 'server.js',
					env: {
						PORT: 4000
					}
				}
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-nodemon');

	grunt.registerTask('default', [
		'nodemon'
	]);
};