var ngAnnotate = require('ng-annotate');
module.exports = function(source) {
  var res = ngAnnotate(source, {
    add: true
  });
  return res.src || source;
};
