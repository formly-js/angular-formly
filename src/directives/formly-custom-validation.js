import angular from 'angular-fix';
export default formlyCustomValidation;

// @ngInject
function formlyCustomValidation(formlyConfig, formlyUtil, $q, formlyWarn) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function formlyCustomValidationLink(scope, el, attrs, ctrl) {
      const opts = scope.options;
      const warnedValidators = [];
      opts.validation.messages = opts.validation.messages || {};
      angular.forEach(opts.validation.messages, (message, key) => {
        opts.validation.messages[key] = () => {
          return formlyUtil.formlyEval(scope, message, ctrl.$modelValue, ctrl.$viewValue);
        };
      });


      var useNewValidatorsApi = ctrl.hasOwnProperty('$validators') && !attrs.hasOwnProperty('useParsers');
      angular.forEach(opts.validators, addValidatorToPipeline.bind(null, false));
      angular.forEach(opts.asyncValidators, addValidatorToPipeline.bind(null, true));

      function addValidatorToPipeline(isAsync, validator, name) {
        setupMessage(validator, name);
        validator = angular.isObject(validator) ? validator.expression : validator;
        if (useNewValidatorsApi) {
          setupWithValidators(validator, name, isAsync);
        } else {
          setupWithParsers(validator, name, isAsync);
        }
      }

      function setupMessage(validator, name) {
        var message = validator.message;
        if (message) {
          opts.validation.messages[name] = () => {
            return formlyUtil.formlyEval(scope, message, ctrl.$modelValue, ctrl.$viewValue);
          };
        }
      }

      function setupWithValidators(validator, name, isAsync) {
        var isPossiblyAsync = !angular.isString(validator);
        var validatorCollection = (isPossiblyAsync || isAsync) ? '$asyncValidators' : '$validators';

        // this is temporary until we can have a breaking change. Allow people to get the wins of the explicitAsync api
        if (formlyConfig.extras.explicitAsync && !isAsync) {
          validatorCollection = '$validators';
        }

        ctrl[validatorCollection][name] = function evalValidity(modelValue, viewValue) {
          var value = formlyUtil.formlyEval(scope, validator, modelValue, viewValue);
          // In the next breaking change, this code should simply return the value
          if (isAsync) {
            return value;
          } else if (isPossiblyAsync && !formlyConfig.extras.explicitAsync) {
            if (isPromiseLike(value)) {
              logAsyncValidatorsDeprecationNotice(validator, opts);
              return value;
            } else {
              return value ? $q.when(value) : $q.reject(value);
            }
          } else {
            return value;
          }
        };
      }

      function setupWithParsers(validator, name, isAsync) {
        let inFlightValidator;
        ctrl.$parsers.unshift(function evalValidityOfParser(viewValue) {
          var isValid = formlyUtil.formlyEval(scope, validator, ctrl.$modelValue, viewValue);
          // In the next breaking change, rather than checking for isPromiseLike, it should just check for isAsync.

          if (isAsync || isPromiseLike(isValid)) {
            if (!isAsync) {
              logAsyncValidatorsDeprecationNotice(validator, opts);
            }
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
      function logAsyncValidatorsDeprecationNotice(validator, options) {
        if (warnedValidators.indexOf(validator) !== -1) {
          // we've warned about this one before. No spam necessary...
          return;
        }
        warnedValidators.push(validator);
        formlyWarn(
          'validators-returning-promises-should-use-asyncValidators',
          'Validators returning promises should use asyncValidators instead of validators.',
          options
        );
      }
    }
  };


  function isPromiseLike(obj) {
    return obj && angular.isFunction(obj.then);
  }
}
