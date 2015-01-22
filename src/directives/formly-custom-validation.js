angular.module('formly').directive('formlyCustomValidation', function (formlyUtil) {
  'use strict';

  return {
    require: 'ngModel',
    link: function (scope, el, attrs, ctrl) {
      var validators = scope.$eval(attrs.formlyCustomValidation);
      if (!validators) {
        return;
      }

      // setup watchers and parsers
      var hasValidators = ctrl.hasOwnProperty('$validators');
      angular.forEach(validators, function (validator, name) {
        if (hasValidators) {
          var validatorCollection = validator.isAsync ? '$asyncValidators' : '$validators';
          ctrl[validatorCollection][name] = function (modelValue, viewValue) {
            return formlyUtil.formlyEval(scope, validator, modelValue, viewValue);
          };
        } else {
          ctrl.$parsers.unshift(function (viewValue) {
            var isValid = formlyUtil.formlyEval(scope, validator, ctrl.$modelValue, viewValue);
            ctrl.$setValidity(name, isValid);
            return viewValue;
          });
        }
      });
    }
  };
});
