var ngModuleName = 'formly';
var angular = require('./angular-fix');
var ngModule = angular.module(ngModuleName, []);

require('./providers')(ngModule);
require('./services')(ngModule);
require('./directives')(ngModule);
require('./run')(ngModule);

module.exports = ngModuleName;
