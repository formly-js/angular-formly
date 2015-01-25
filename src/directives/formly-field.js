let angular = require('angular-fix');

module.exports = ngModule => {
  ngModule.directive('formlyField', formlyField);

  formlyField.test = ON_TEST ? require('./formlyField.test')(ngModule) : null;

  function formlyField($http, $q, $compile, $templateCache, formlyConfig, formlyUtil) {
    return {
      restrict: 'AE',
      transclude: true,
      scope: {
        options: '=',
        model: '=',
        formId: '=?',
        index: '=?',
        fields: '=?',
        form: '=?'
      },
      controller: function fieldController($scope, $interval) {
        // set field id to link labels and fields
        $scope.id = formlyUtil.getFieldId($scope.formId, $scope.options, $scope.index);

        angular.extend($scope.options, {
          // attach the key in case the formly-field directive is used directly
          key: $scope.options.key || $scope.index || 0,
          value: valueGetterSetter,
          runExpressions: runExpressions,
          modelOptions: {
            getterSetter: true,
            allowInvalid: true
          }
        });

        // initalization
        runExpressions();
        if (!$scope.options.noFormControl) {
          setFormControl();
        }
        if ($scope.options.model) {
          $scope.$watch('options.model', runExpressions, true);
        }

        // function definitions
        function runExpressions() {
          var field = $scope.options;
          var currentValue = valueGetterSetter();
          angular.forEach(field.expressionProperties, function runExpression(expression, prop) {
            if (prop !== 'data') {
              field[prop] = formlyUtil.formlyEval($scope, expression, currentValue);
            } else {
              field.data = field.data || {};
              angular.forEach(field.expressionProperties.data, function runExpression(dataExpression, dataProp) {
                field.data[dataProp] = formlyUtil.formlyEval($scope, dataExpression, currentValue);
              });
            }
          });
        }

        function valueGetterSetter(newVal) {
          if (!$scope.model || !$scope.options.key) {
            return;
          }
          if (angular.isDefined(newVal)) {
            $scope.model[$scope.options.key] = newVal;
          }
          return $scope.model[$scope.options.key];
        }

        function setFormControl() {
          var stopWaitingForDestroy;
          var maxTime = 2000;
          var intervalTime = 5;
          var iterations = 0;
          var interval = $interval(function () {
            iterations++;
            if (!angular.isDefined($scope.options.key)) {
              return cleanUp();
            }
            var formControl = $scope.form && $scope.form[$scope.id];
            if (formControl) {
              $scope.options.formControl = formControl;
              cleanUp();
            } else if (intervalTime * iterations > maxTime) {
              formlyUtil.warn(`Couldn't set the formControl after ${maxTime}ms`, $scope);
              cleanUp();
            }
          }, intervalTime);
          stopWaitingForDestroy = $scope.$on('$destroy', cleanUp);

          function cleanUp() {
            stopWaitingForDestroy();
            $interval.cancel(interval);
          }
        }
      },
      link: function fieldLink(scope, el) {
        apiCheck(scope.options);
        getTemplate(scope.options).then(setElementTemplate);

        function setElementTemplate(template) {
          el.html(template);
          $compile(el.contents())(scope);
        }
      }
    };


    function getTemplate(options) {
      let template = options.template || formlyConfig.getTemplate(options.type);
      if (template) {
        return $q.when(template);
      } else {
        let templateUrl = options.templateUrl || formlyConfig.getTemplateUrl(options.type);
        let httpOptions = {cache: $templateCache};
        return $http.get(templateUrl, httpOptions).then(function (response) {
          return response.data;
        }).catch(function (error) {
          formlyUtil.warn('Problem loading template for ' + templateUrl, error);
        });
      }
    }

    function apiCheck(options) {
      var templateOptions = getTemplateOptionsCount(options);
      if (templateOptions === 0) {
        throw formlyUtil.getFieldError(
          `template type '${options.type}' not supported. On element:`, options
        );
      } else if (templateOptions > 1) {
        throw formlyUtil.getFieldError(
          'You must only provide a type, template, or templateUrl for a field', options
        );
      }

      function getTemplateOptionsCount(options) {
        let templateOptions = 0;
        templateOptions += angular.isDefined(options.template) ? 1 : 0;
        templateOptions += angular.isDefined(options.type) ? 1 : 0;
        templateOptions += angular.isDefined(options.templateUrl) ? 1 : 0;
        return templateOptions;
      }
    }
  }
};
