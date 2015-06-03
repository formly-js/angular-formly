/* eslint-env node */
/* eslint no-console:0 */
var glob = require('glob');
var async = require('async');
var fs = require('fs');
var chalk = require('chalk');

glob('app/components/**/*.test.js', function(err, files) {
  if (err) {
    throw err;
  }
  async.map(files, getFileReader(), function(err, results) {
    if (err) {
      throw err;
    }
    var badFiles = [];
    var badMatch = /describe\.only|it\.only|xdescribe|xit/gmi;
    results.forEach(function(fileContents, index) {
      if (badMatch.test(fileContents)) {
        badFiles.push(files[index]);
      }
    });
    var p = badFiles.length > 1;
    if (badFiles.length) {
      var message = chalk.bold.red('There ' + (p ? 'are' : 'is') + ' ' + badFiles.length + ' ' +
        (p ? 'files' : 'file') + ' with a `.only` or xdescribe or xit so not all tests will be run:');
      var badFilesPart = chalk.red(badFiles.join('\n\t'));
      console.warn([message, badFilesPart].join('\n\t'));
      throw new Error('only-check failed');
    }
  });
});

function getFileReader() {
  return function readFileUTF8(filepath, callback) {
    return fs.readFile(filepath, 'utf8', callback);
  };
}
