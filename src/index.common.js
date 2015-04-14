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

ngModule.constant('formlyApiCheck', require('./providers/formlyApiCheck'));
ngModule.constant('formlyErrorAndWarningsUrlPrefix', require('./providers/formlyErrorAndWarningsUrlPrefix'));
ngModule.constant('formlyVersion', require('./providers/formlyVersion'));

ngModule.provider('formlyUsability', require('./providers/formlyUsability'));
ngModule.provider('formlyConfig', require('./providers/formlyConfig'));

ngModule.factory('formlyValidationMessages', require('./providers/formlyValidationMessages'));
ngModule.factory('formlyUtil', require('./services/formlyUtil'));
ngModule.factory('formlyWarn', require('./services/formlyWarn'));

ngModule.directive('formlyCustomValidation', require('./directives/formly-custom-validation'));
ngModule.directive('formlyField', require('./directives/formly-field'));
ngModule.directive('formlyFocus', require('./directives/formly-focus'));
ngModule.directive('formlyForm', require('./directives/formly-form'));

ngModule.run(require('./run/formlyNgModelAttrsManipulator'));
ngModule.run(require('./run/formlyCustomTags'));

module.exports = ngModuleName;
