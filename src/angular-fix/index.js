// some versions of angular don't export the angular module properly,
// so we get it from window in this case.
var angular = require('angular');
if (!angular.version) {
  angular = window.angular;
}
module.exports = angular;
