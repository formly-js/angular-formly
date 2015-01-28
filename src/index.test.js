let ngModuleName = 'formly';
let angular = require('angular');
if (angular.version) {
  window.angular = angular;
} else {
  angular = window.angular;
}
require('angular-mocks/angular-mocks');
let ngModule = angular.module(ngModuleName, []);

require('./providers')(ngModule);
require('./services')(ngModule);
require('./directives')(ngModule);

module.exports = ngModuleName;
