/**
 * grunt-ng-annotate
 * https://github.com/mzgol/grunt-ng-annotate
 *
 * Author Michał Gołębiowski <m.goleb@gmail.com>
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    var fs = require('fs'),
        ngAnnotate = require('ng-annotate');

    grunt.registerMultiTask('ngAnnotate',
        'Add, remove and rebuild AngularJS dependency injection annotations',

        function () {
            var filesNum = 0,
                validRun = true,
            // Merge task-specific and/or target-specific options with these defaults.
                options = this.options();

            if (!options.ngAnnotateOptions) {
                options.ngAnnotateOptions = {};
            }

            if (options.add != null) {
                options.ngAnnotateOptions.add = options.add;
                delete options.add;
            } else {
                options.ngAnnotateOptions.add = true;
            }

            if (options.remove != null) {
                options.ngAnnotateOptions.remove = options.remove;
                delete options.remove;
            } else {
                options.ngAnnotateOptions.remove = false;
            }

            if (options.regexp != null) {
                options.ngAnnotateOptions.regexp = options.regexp;
                delete options.regexp;
            }

            if (options.singleQuotes != null) {
                options.ngAnnotateOptions.single_quotes = options.singleQuotes;
                delete options.singleQuotes;
            }

            if (options.transformDest != null) {
                grunt.log.warn(
                    [
                        'The `transformDest` option is deprecated and will be removed in the future.',
                        'The following configuration:',
                        '',
                        '    app: {',
                        '        options: {',
                        '            transformDest: function (srcPath) {',
                        '                return doSomethingWithSrcPath(srcPath);',
                        '            },',
                        '        },',
                        '        src: [\'app/*.js\'],',
                        '    },',
                        '',
                        'can be replaced by:',
                        '',
                        '    app: {',
                        '        files: [',
                        '           {',
                        '               expand: true,',
                        '               src: [\'app/*.js\'],',
                        '               rename: function (destPath, srcPath) {',
                        '                   return doSomethingWithSrcPath(srcPath);',
                        '               },',
                        '            },',
                        '        ],',
                        '    },',
                    ].join('\n')
                );
            }

            if (options.outputFileSuffix != null) {
                grunt.log.warn(
                    [
                        'The `outputFileSuffix` option is deprecated and will be removed in the future.',
                        'The following configuration:',
                        '',
                        '    app: {',
                        '        options: {',
                        '            outputFileSuffix: \'-annotated\',',
                        '        },',
                        '        src: [\'app/*.js\'],',
                        '    },',
                        '',
                        'can be replaced by:',
                        '',
                        '    app: {',
                        '        files: [',
                        '            {',
                        '               expand: true,',
                        '               src: [\'app/*.js\'],',
                        '               rename: function (destPath, srcPath) {',
                        '                   return srcPath + \'-annotated\';',
                        '               },',
                        '            },',
                        '        ],',
                        '    },',
                    ].join('\n')
                );
            }

            // Iterate over all specified file groups.
            this.files.forEach(function (mapping) {
                var tmpFilePath = mapping.dest; // use the destination file as a temporary source one

                if (mapping.dest) {
                    // If destination file provided, concatenate all source files to a temporary one.
                    // In such a case options transformDest & outputFileSuffix are ignored.

                    grunt.file.write(
                        tmpFilePath,
                        mapping.src.map(function (file) {
                            return grunt.file.read(file);
                        }).join('\n')
                    );

                    if (!runNgAnnotate(tmpFilePath, tmpFilePath, options.ngAnnotateOptions)) {
                        validRun = false;
                    }
                } else {
                    // Otherwise each file will have its own ngAnnotate output.

                    // Transform the destination path.
                    if (!options.transformDest) {
                        // By default, append options.outputFileSuffix to the file name.
                        options.transformDest = function transformDest(path) {
                            return path + (options.outputFileSuffix || '');
                        };
                    }

                    mapping.src.map(function (path) {
                        if (!runNgAnnotate(path, options.transformDest(path), options.ngAnnotateOptions)) {
                            validRun = false;
                        }
                    });
                }
            });

            function runNgAnnotate(srcPath, destPath, ngAnnotateOptions) {
                filesNum++;

                var ngAnnotateOutput = ngAnnotate(grunt.file.read(srcPath), ngAnnotateOptions);

                // Write the destination file.
                if (ngAnnotateOutput.errors) {
                    grunt.log.write('Generating "' + destPath + '" from "' + srcPath + '"...');
                    grunt.log.error();
                    ngAnnotateOutput.errors.forEach(function (error) {
                        grunt.log.error(error);
                    });
                    return false;
                }

                // Remove the temporary destination file if existed.
                if (fs.existsSync(destPath)) {
                    fs.unlinkSync(destPath);
                }

                // Write ngAnnotate output to the target file.
                grunt.file.write(destPath, ngAnnotateOutput.src);

                return true;
            }

            if (validRun) {
                if (filesNum < 1) {
                    grunt.log.ok('No files provided to the ngAnnotate task.');
                } else {
                    grunt.log.ok(filesNum + (filesNum === 1 ? ' file' : ' files') + ' successfully generated.');
                }
            }
            return validRun;
        });

};
