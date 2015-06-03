/* jshint node:true */
'use strict';
var glob = require('glob');
var async = require('async');
var fs = require('fs');
var chalk = require('chalk');

glob('src/**/*.js', function(err, files) {
  if (err) {
    throw err;
  }
  async.map(files, getFileReader(), function(err, results) {
    if (err) {
      throw err;
    }
    var badFiles = [];
    var badMatch = / console\.(log|info|error\()/gmi; // warn is ok...
    results.forEach(function(fileContents, index) {
      if (badMatch.test(fileContents)) {
        console.log(badMatch.exec(fileContents));
        badFiles.push(files[index]);
      }
    });
    var p = badFiles.length > 1;
    if (badFiles.length) {
      var message = chalk.bold.red('There ' + (p ? 'are' : 'is') + ' ' + badFiles.length + ' ' +
        (p ? 'files' : 'file') + ' with a `console` call:');
      var badFilesPart = chalk.red(badFiles.join('\n\t'));
      console.warn([message, badFilesPart].join('\n\t'));
      throw new Error('console-check failed');
    }
  });
});

function getFileReader() {
  return function readFileUTF8(filepath, callback) {
    return fs.readFile(filepath, 'utf8', callback);
  };
}
