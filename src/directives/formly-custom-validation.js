export default formlyCustomValidation;

// @ngInject
function formlyCustomValidation(formlyUtil, $q) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function formlyCustomValidationLink(scope, el, attrs, ctrl) {
      const opts = scope.options;
      if (opts.validators) {
        checkValidators(opts.validators);
      }
      opts.validation.messages = opts.validation.messages || {};
      angular.forEach(opts.validation.messages, (message, key) => {
        opts.validation.messages[key] = () => {
          return formlyUtil.formlyEval(scope, message, ctrl.$modelValue, ctrl.$viewValue);
        };
      });


      var useNewValidatorsApi = ctrl.hasOwnProperty('$validators') && !attrs.hasOwnProperty('useParsers');
      angular.forEach(opts.validators, function addValidatorToPipeline(validator, name) {
        var message = validator.message;
        if (message) {
          opts.validation.messages[name] = () => {
            return formlyUtil.formlyEval(scope, message, ctrl.$modelValue, ctrl.$viewValue);
          };
        }
        validator = angular.isObject(validator) ? validator.expression : validator;
        var isPossiblyAsync = !angular.isString(validator);
        if (useNewValidatorsApi) {
          setupWithValidators();
        } else {
          setupWithParsers();
        }

        function setupWithValidators() {
          var validatorCollection = isPossiblyAsync ? '$asyncValidators' : '$validators';
          ctrl[validatorCollection][name] = function evalValidity(modelValue, viewValue) {
            var value = formlyUtil.formlyEval(scope, validator, modelValue, viewValue);
            if (isPossiblyAsync) {
              return isPromiseLike(value) ? value : value ? $q.when(value) : $q.reject(value);
            } else {
              return value;
            }
          };
        }

        function setupWithParsers() {
          let inFlightValidator;
          ctrl.$parsers.unshift(function evalValidityOfParser(viewValue) {
            var isValid = formlyUtil.formlyEval(scope, validator, ctrl.$modelValue, viewValue);
            if (isPromiseLike(isValid)) {
              ctrl.$pending = ctrl.$pending || {};
              ctrl.$pending[name] = true;
              inFlightValidator = isValid;
              isValid.then(() => {
                if (inFlightValidator === isValid) {
                  ctrl.$setValidity(name, true);
                }
              }).catch(() => {
                if (inFlightValidator === isValid) {
                  ctrl.$setValidity(name, false);
                }
              }).finally(() => {
                if (Object.keys(ctrl.$pending).length === 1) {
                  delete ctrl.$pending;
                } else {
                  delete ctrl.$pending[name];
                }
              });
            } else {
              ctrl.$setValidity(name, isValid);
            }
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
      if (angular.isString(validator)) {
        return;
      }
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
}
