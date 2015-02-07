var angular = require('angular-fix');

module.exports = ngModule => {
  ngModule.factory('formlyUtil', function() {

    var objectPrototype = Object.getPrototypeOf({});
    var arrayPrototype = Object.getPrototypeOf([]);
    return {
      formlyEval: formlyEval,
      getFieldId: getFieldId,
      reverseDeepMerge: reverseDeepMerge
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

    function reverseDeepMerge() {
      var realRes = arguments[0];
      var res = {};
      angular.forEach([...arguments].reverse(), function(src) {
        if (!src) {
          return;
        }
        angular.forEach(src, function(val, prop) {
          /* jshint maxcomplexity:7 */
          if (typeof val === 'object' && val !== null &&
            (Object.getPrototypeOf(val) === objectPrototype || Object.getPrototypeOf(val) === arrayPrototype)) {
            var deepRes = res[prop];
            if (!deepRes && angular.isArray(val)) {
              deepRes = [];
            } else if (!deepRes) {
              deepRes = {};
            }
            res[prop] = reverseDeepMerge(deepRes, val);
          } else if (angular.isDefined(val)) {
            res[prop] = val;
          }
        });
      });
      angular.forEach(realRes, function(val, prop) {
        delete realRes[prop];
      });
      angular.forEach(res, function(val, prop) {
        realRes[prop] = val;
      });
      res = realRes;
      return res;
    }


  });
};
