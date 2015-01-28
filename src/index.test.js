let ngModuleName = 'formly';
let angular = require('./angular-fix');
require('angular-mocks/angular-mocks');
let ngModule = angular.module(ngModuleName, []);

require('./providers')(ngModule);
require('./services')(ngModule);
require('./directives')(ngModule);

module.exports = ngModuleName;
