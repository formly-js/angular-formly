let angular = require('angular-fix');

module.exports = ngModule => {
  ngModule.factory('formlyUtil', function (formlyConfig) {
    var errorsAndWarningsUrlPrefix = 'https://github.com/formly-js/angular-formly/wiki/Errors-and-Warnings#';
    return {
      getFieldError: getFieldError,
      formlyEval: formlyEval,
      warn: warn,
      getFieldId: getFieldId
    };

    function getFieldError(errorInfoSlug, message, field) {
      let url = `${errorsAndWarningsUrlPrefix}${errorInfoSlug}`;
      return new Error(
        `Formly Error: ${message}. ${url} Field definition: ${angular.toJson(field)}`
      );
    }

    function formlyEval(scope, expression, modelValue, viewValue) {
      if (angular.isFunction(expression)) {
        return expression(viewValue, modelValue, scope);
      } else {
        return scope.$eval(expression, {
          $viewValue: viewValue,
          $modelValue: modelValue
        });
      }
    }

    function warn() {
      if (!formlyConfig.disableWarnings) {
        var args = Array.prototype.slice.call(arguments);
        var warnInfoSlug = args.shift();
        args.unshift('Formly Warning:');
        args.push(`${errorsAndWarningsUrlPrefix}${warnInfoSlug}`);
        console.warn.apply(console, args);
      }
    }

    function getFieldId(formId, options, index) {
      var type = options.type;
      if (!type && options.template) {
        type = 'template';
      } else if (!type && options.templateUrl) {
        type = 'templateUrl';
      }

      return [formId, type, options.key, index].join('_');
    }

  });
};
