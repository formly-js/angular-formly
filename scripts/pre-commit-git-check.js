var fs = require('fs');
var path = require('path');
// var test = getTests();
var format = /(.+)\(.+\)\: (.+)(\n\n([.|\s|\S]*)(\n\n([.|\s|\S]*))?)?/;

fs.readFile(path.resolve(__dirname, '../.git/COMMIT_EDITMSG'), {encoding: 'UTF-8'}, function(err, contents) {
  if (err || !commitFollowsFormat(contents)) {
    throw err || new Error('Commit message does not follow conventions! Run `npm run commit` to commit instead of `git commit`');
  }
});


function commitFollowsFormat(contents) {
  var parts = format.exec(contents);
  return !!parts;
}

// TODO add specific tests for parts
/*
function getTests() {
  return {
    type: testType,
    scope: testScope,
    subject: testSubject,
    body: testBody,
    footer: testFooter
  };
}
*/
