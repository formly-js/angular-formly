var angular = require('angular-fix');

module.exports = ngModule => {
  ngModule.factory('formlyUtil', function() {
    return {
      formlyEval: formlyEval,
      getFieldId: getFieldId
    };

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
