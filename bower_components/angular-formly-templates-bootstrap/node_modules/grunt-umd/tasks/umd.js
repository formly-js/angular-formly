'use strict';

function handleBackwardCompatibility(options) {
    var dependency,
        dependencyType;

    for(dependencyType in options.deps) {
        if(dependencyType === 'args' || dependencyType === 'default') {
            continue;
        }

        dependency = options.deps[dependencyType];

        if(isArray(dependency)) {
            options.deps[dependencyType] = {
                items: dependency
            };
        }
    }

    return options;
}

function verifyArguments(options) {
    if (!options.src) {
        throw new Error('Missing source file (src).');
    }
}

var util = require('util');
var isArray = util.isArray;
var umdify = require('libumd');
var extend = require('xtend');

module.exports = function(grunt) {

    grunt.registerMultiTask('umd', 'Surrounds code with the universal module definition.',
        function() {
            var file = grunt.file;
            var data = extend({}, this.data);
            var options = extend(data, this.options());

            try {
                verifyArguments(options);
            } catch (error) {
                grunt.warn(error, 3);
            }

            options = handleBackwardCompatibility(options);

            try {
                file.write(options.dest || options.src, umdify(file.read(options.src), options));
            } catch (error) {
                grunt.warn(error, 3);
            }
        });
};
