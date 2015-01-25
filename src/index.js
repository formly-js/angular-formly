let moduleName = module.exports = 'formly';
let angular = require('angular-fix');
let ngModule = angular.module(moduleName, []);

require('./providers')(ngModule);
require('./services')(ngModule);
require('./directives')(ngModule);
