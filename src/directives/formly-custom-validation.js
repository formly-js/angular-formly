import angular from 'angular-fix'
export default formlyCustomValidation

// @ngInject
function formlyCustomValidation(formlyUtil) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function formlyCustomValidationLink(scope, el, attrs, ctrl) {
      const opts = scope.options
      opts.validation.messages = opts.validation.messages || {}
      angular.forEach(opts.validation.messages, (message, key) => {
        opts.validation.messages[key] = () => {
          return formlyUtil.formlyEval(scope, message, ctrl.$modelValue, ctrl.$viewValue)
        }
      })


      const useNewValidatorsApi = ctrl.hasOwnProperty('$validators') && !attrs.hasOwnProperty('useParsers')
      angular.forEach(opts.validators, angular.bind(null, addValidatorToPipeline, false))
      angular.forEach(opts.asyncValidators, angular.bind(null, addValidatorToPipeline, true))

      function addValidatorToPipeline(isAsync, validator, name) {
        setupMessage(validator, name)
        validator = angular.isObject(validator) ? validator.expression : validator
        if (useNewValidatorsApi) {
          setupWithValidators(validator, name, isAsync)
        } else {
          setupWithParsers(validator, name, isAsync)
        }
      }

      function setupMessage(validator, name) {
        const message = validator.message
        if (message) {
          opts.validation.messages[name] = () => {
            return formlyUtil.formlyEval(scope, message, ctrl.$modelValue, ctrl.$viewValue)
          }
        }
      }

      function setupWithValidators(validator, name, isAsync) {
        const validatorCollection = isAsync ? '$asyncValidators' : '$validators'

        ctrl[validatorCollection][name] = function evalValidity(modelValue, viewValue) {
          return formlyUtil.formlyEval(scope, validator, modelValue, viewValue)
        }
      }

      function setupWithParsers(validator, name, isAsync) {
        let inFlightValidator
        ctrl.$parsers.unshift(function evalValidityOfParser(viewValue) {
          const isValid = formlyUtil.formlyEval(scope, validator, ctrl.$modelValue, viewValue)
          if (isAsync) {
            ctrl.$pending = ctrl.$pending || {}
            ctrl.$pending[name] = true
            inFlightValidator = isValid
            isValid.then(() => {
              if (inFlightValidator === isValid) {
                ctrl.$setValidity(name, true)
              }
            }).catch(() => {
              if (inFlightValidator === isValid) {
                ctrl.$setValidity(name, false)
              }
            }).finally(() => {
              const $pending = ctrl.$pending || {}
              if (Object.keys($pending).length === 1) {
                delete ctrl.$pending
              } else {
                delete ctrl.$pending[name]
              }
            })
          } else {
            ctrl.$setValidity(name, isValid)
          }
          return viewValue
        })
      }
    },
  }
}
