let angular = require('angular-fix');

module.exports = ngModule => {
  ngModule.directive('formlyField', formlyField);

  formlyField.tests = ON_TEST ? require('./formly-field.test')(ngModule) : null;

  function formlyField($http, $q, $compile, $templateCache, formlyConfig, formlyUtil, formlyUsability, formlyWarn) {
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
          var interval = $interval(function() {
            iterations++;
            if (!angular.isDefined($scope.options.key)) {
              return cleanUp();
            }
            var formControl = $scope.form && $scope.form[$scope.id];
            if (formControl) {
              $scope.options.formControl = formControl;
              cleanUp();
            } else if (intervalTime * iterations > maxTime) {
              formlyWarn(
                'couldnt-set-the-formcontrol-after-timems',
                `Couldn't set the formControl after ${maxTime}ms`,
                $scope
              );
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
        getTemplate(scope.options)
          .then(transcludeInWrapper(scope.options))
          .then(setElementTemplate);

        function setElementTemplate(templateEl) {
          el.html(asHtml(templateEl));
          $compile(el.contents())(scope);
        }
      }
    };

    function asHtml(el) {
      var wrapper = angular.element('<a></a>');
      return wrapper.append(el).html();
    }


    function getTemplate(options) {
      let template = options.template || formlyConfig.getTemplate(options.type);
      let templateUrl = options.templateUrl || formlyConfig.getTemplateUrl(options.type);
      if (template) {
        return $q.when(template);
      } else if (templateUrl) {
        let httpOptions = {cache: $templateCache};
        return $http.get(templateUrl, httpOptions).then(function(response) {
          return response.data;
        }).catch(function(error) {
          formlyWarn(
            'problem-loading-template-for-templateurl',
            'Problem loading template for ' + templateUrl,
            error
          );
        });
      } else {
        throw formlyUsability.getFieldError(
          'template-type-type-not-supported',
          `template type '${options.type}' not supported. On element:`, options
        );
      }
    }

    function transcludeInWrapper(options) {
      let templateWrapper = getTemplateWrapperOption(options);

      return function transcludeTemplate(template) {
        if (!templateWrapper) {
          return $q.when(angular.element(template));
        }
        formlyUsability.checkWrapper(templateWrapper);
        if (templateWrapper.template) {
          formlyUsability.checkWrapperTemplate(templateWrapper.template, templateWrapper);
          return $q.when(doTransclusion(templateWrapper.template));
        } else {
          let httpOptions = {cache: $templateCache};
          return $http.get(templateWrapper.url, httpOptions).then(function(response) {
            let wrapper = response.data;
            formlyUsability.checkWrapperTemplate(wrapper, templateWrapper);
            return doTransclusion(wrapper);
          }).catch(function(error) {
            formlyWarn(
              'proplem-loading-template-for-wrapper',
              'Problem loading template for wrapper' + JSON.stringify(templateWrapper),
              error
            );
          });
        }

        function doTransclusion(wrapper) {
          let wrapperEl = angular.element(wrapper);
          let transcludeEl = wrapperEl.find('formly-transclude');
          transcludeEl.replaceWith(template);
          return wrapperEl;
        }
      };
    }

    function getTemplateWrapperOption(options) {
      /* jshint maxcomplexity:6 */
      let templateOption = options.wrapper;
      // explicit null means no wrapper
      if (templateOption === null) {
        return '';
      }
      var templateWrapper = templateOption;
      // nothing specified means use the default wrapper for the type
      if (!templateOption) {
        templateWrapper = formlyConfig.getTemplateWrapperByType(options.type) || formlyConfig.getTemplateWrapper();
      } else if (typeof templateOption === 'string') {
        // string means it's a type
        templateWrapper = formlyConfig.getTemplateWrapper(templateOption);
      }
      return templateWrapper;
    }

    function apiCheck(options) {
      var templateOptions = getTemplateOptionsCount(options);
      if (templateOptions === 0) {
        throw formlyUsability.getFieldError(
          'you-must-provide-one-of-type-template-or-templateurl-for-a-field',
          'You must provide one of type, template, or templateUrl for a field', options
        );
      } else if (templateOptions > 1) {
        throw formlyUsability.getFieldError(
          'you-must-only-provide-a-type-template-or-templateurl-for-a-field',
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
