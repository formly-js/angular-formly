module.exports = ngModule => {
  ngModule.directive('formlyCustomValidation', function(formlyUtil, $q) {

    return {
      require: 'ngModel',
      link: function(scope, el, attrs, ctrl) {
        var validators = scope.$eval(attrs.formlyCustomValidation);
        if (!validators) {
          return;
        }
        checkValidators(validators);
        scope.options.validation.messages = scope.options.validation.messages || {};

        // setup watchers and parsers
        var hasValidators = ctrl.hasOwnProperty('$validators');
        angular.forEach(validators, function(validator, name) {
          var message = validator.message;
          if (message) {
            scope.options.validation.messages[name] = () => {
              return formlyUtil.formlyEval(scope, message, ctrl.$modelValue, ctrl.$viewValue);
            };
          }
          validator = angular.isObject(validator) ? validator.expression : validator;
          if (hasValidators) {
            var isPossiblyAsync = !angular.isString(validator);
            var validatorCollection = isPossiblyAsync ? '$asyncValidators' : '$validators';
            ctrl[validatorCollection][name] = function(modelValue, viewValue) {
              var value = formlyUtil.formlyEval(scope, validator, modelValue, viewValue);
              if (isPossiblyAsync) {
                return isPromiseLike(value) ? value : value ? $q.when(value) : $q.reject(value);
              } else {
                return value;
              }
            };
          } else {
            ctrl.$parsers.unshift(function(viewValue) {
              var isValid = formlyUtil.formlyEval(scope, validator, ctrl.$modelValue, viewValue);
              ctrl.$setValidity(name, isValid);
              return viewValue;
            });
          }
        });
      }
    };
    function isPromiseLike(obj) {
      return obj && angular.isFunction(obj.then);
    }

    function checkValidators(validators) {
      var allowedProperties = ['expression', 'message'];
      var validatorsWithExtraProps = {};
      angular.forEach(validators, (validator, name) => {
        var extraProps = [];
        angular.forEach(validator, (v, key) => {
          if (allowedProperties.indexOf(key) === -1) {
            extraProps.push(key);
          }
        });
        if (extraProps.length) {
          validatorsWithExtraProps[name] = extraProps;
        }
      });
      if (Object.keys(validatorsWithExtraProps).length) {
        throw new Error([
          `Validators are only allowed to be functions or objects that have ${allowedProperties.join(', ')}.`,
          `You provided some extra properties: ${JSON.stringify(validatorsWithExtraProps)}`
        ].join(' '));
      }
    }
  });
};
