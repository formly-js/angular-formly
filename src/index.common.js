const apiCheck = require('api-check');
if (!apiCheck) {
  throw new Error(
    'angular-formly requires the library apiCheck.js! Please include it! ' +
      require('./other/docsBaseUrl') + 'apicheckjs-dependency-required'
  );
}
const ngModuleName = 'formly';
const angular = require('./angular-fix');
const ngModule = angular.module(ngModuleName, []);

require('./providers')(ngModule);
require('./services')(ngModule);
require('./directives')(ngModule);
require('./run')(ngModule);

module.exports = ngModuleName;
