'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('../package.json'),
        umd: {
            'default': {
                src: 'js/<%= pkg.name %>.js',
                dest: 'output/<%= pkg.name %>.js',
                deps: { // optional
                    'default': ['foo', 'bar'],
                    global: ['foobar', 'bar'] // custom override
                },
                objectToExport: 'demo',
                globalAlias: 'demo',
                indent: 4
            },
            'nodeps': {
                src: 'js/<%= pkg.name %>.js',
                dest: 'output/<%= pkg.name %>.nodeps.js',
                objectToExport: 'nodeps',
                globalAlias: 'nodeps'
            },
            'noglobalalias': {
                src: 'js/<%= pkg.name %>.js',
                dest: 'output/<%= pkg.name %>.noglobalalias.js',
                objectToExport: 'demo'
            },
            'noobjecttoexport': {
                src: 'js/<%= pkg.name %>.js',
                dest: 'output/<%= pkg.name %>.noobjecttoexport.js'
            },
            'onlydest': {
                src: 'js/<%= pkg.name %>.js',
                dest: 'output/<%= pkg.name %>.dest.js'
            },
            'rails': {
                src: 'js/<%= pkg.name %>.js',
                dest: 'output/<%= pkg.name %>.rails.js',
                template: 'umd+rails.hbs',
                objectToExport: 'demo',
                indent: 2,
                deps: {
                    args : ['$', '_', 'Backbone'],
                    'default': ['$', '_', 'Backbone'],
                    amd: {
                        indent: 6,
                        items: ['jquery', 'underscore', 'backbone'],
                        prefix: '\'',
                        separator: ',\n',
                        suffix: '\''
                    },
                    cjs: {
                        indent: 6,
                        items: ['jquery', 'underscore', 'backbone'],
                        prefix: 'require(\'',
                        separator: ',\n',
                        suffix: '\')'
                    },
                    global: {
                        items: ['jQuery', '_', 'Backbone'],
                    },
                    pipeline: {
                        indent: 0,
                        items : ['jquery', 'vendor/underscore-min', 'vendor/backbone-min'],
                        prefix: '//= require ',
                        separator: '\n',
                    }
                }
            },
            returnExportsGlobal: {
                src             : 'js/<%= pkg.name %>.js',
                dest            : 'output/<%= pkg.name %>.returnExportsGlobal.js',
                template        : 'returnExportsGlobal',
                objectToExport  : '__',
                globalAlias     : '__',
                indent          : 4,
                deps            : {
                    args        : ['_'],
                    'default'   : ['_'],
                    amd         : {
                        indent      : 6,
                        items       : ['lodash'],
                        prefix      : '\'',
                        separator   : ',\n',
                        suffix      : '\''
                    },
                    cjs         : {
                        indent      : 6,
                        items       : ['lodash'],
                        prefix      : 'require(\'',
                        separator   : ',\n',
                        suffix      : '\')'
                    },
                    global      : {
                        items: ['_'],
                        prefix: ''
                    }
                }
            }
        }
    });

    grunt.registerTask('default', ['umd']);
    grunt.registerTask('nodeps', ['umd:nodeps']);
    grunt.registerTask('noglobalalias', ['umd:noglobalalias']);
    grunt.registerTask('noobjecttoexport', ['umd:noobjecttoexport']);
    grunt.registerTask('onlydest', ['umd:onlydest']);
    grunt.registerTask('rails', ['umd:rails']);
    grunt.registerTask('returnExportsGlobal', ['umd:returnExportsGlobal']);

    grunt.loadTasks('../tasks');
};
