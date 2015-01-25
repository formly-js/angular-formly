var ngAnnotate = require('ng-annotate');
module.exports = function(source) {
  var res = ngAnnotate(source, {
    add: true
  });
  console.log(res.src);
  return res.src || source;
};
