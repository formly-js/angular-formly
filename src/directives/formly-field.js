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
      controller: function fieldController($scope, $interval, $parse) {
        apiCheck($scope.options);
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
            var setter = $parse(prop).assign;
            setter(field, formlyUtil.formlyEval($scope, expression, currentValue));
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
        getFieldTemplate(scope.options)
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

    function getFieldTemplate(options) {
      let type = formlyConfig.getType(options.type);
      let template = options.template || type && type.template;
      let templateUrl = options.templateUrl || type && type.templateUrl;
      if (!template && !templateUrl) {
        throw formlyUsability.getFieldError(
          'template-type-type-not-supported',
          `template type '${options.type}' not supported. On element:`, options
        );
      }
      return getTemplate(template || templateUrl, !template);
    }


    function getTemplate(template, isUrl) {
      if (!isUrl) {
        return $q.when(template);
      } else {
        let httpOptions = {cache: $templateCache};
        return $http.get(template, httpOptions).then(function(response) {
          return response.data;
        }).catch(function(error) {
          formlyWarn(
            'problem-loading-template-for-templateurl',
            'Problem loading template for ' + template,
            error
          );
        });
      }
    }

    function transcludeInWrapper(options) {
      let wrapper = getWrapperOption(options);

      return function transcludeTemplate(template) {
        if (!wrapper) {
          return $q.when(angular.element(template));
        } else if (angular.isArray(wrapper)) {
          wrapper.forEach(formlyUsability.checkWrapper);
          let promises = wrapper.map(w => getTemplate(w.template || w.templateUrl, !w.template));
          return $q.all(promises).then(wrappersTemplates => {
            wrappersTemplates.forEach((wrapperTemplate, index) => {
              formlyUsability.checkWrapperTemplate(wrapperTemplate, wrapper[index]);
            });
            wrappersTemplates.reverse(); // wrapper 0 is wrapped in wrapper 1 and so on...
            let totalWrapper = wrappersTemplates.shift();
            wrappersTemplates.forEach(wrapperTemplate => {
              totalWrapper = doTransclusion(totalWrapper, wrapperTemplate);
            });
            return doTransclusion(totalWrapper, template);
          });
        } else {
          formlyUsability.checkWrapper(wrapper);
          let t = wrapper.template || wrapper.templateUrl;
          return getTemplate(t, !wrapper.template).then(function(wrapperTemplate) {
            formlyUsability.checkWrapperTemplate(wrapperTemplate, wrapper);
            return doTransclusion(wrapperTemplate, template);
          });
        }

      };
    }

    function doTransclusion(wrapper, template) {
      let wrapperEl = angular.element(wrapper);
      let transcludeEl = wrapperEl.find('formly-transclude');
      transcludeEl.replaceWith(template);
      return wrapperEl;
    }

    function getWrapperOption(options) {
      /* jshint maxcomplexity:9 */
      let templateOption = options.wrapper;
      // explicit null means no wrapper
      if (templateOption === null) {
        return '';
      }
      var wrapper = templateOption;
      // nothing specified means use the default wrapper for the type
      if (!templateOption) {
        wrapper = formlyConfig.getWrapperByType(options.type);
      } else if (angular.isString(templateOption)) {
        // string means it's a type
        wrapper = formlyConfig.getWrapper(templateOption);
      } else if (angular.isArray(templateOption)) {
        // array means wrap the wrappers
        wrapper = templateOption.map(wrapperName => formlyConfig.getWrapper(wrapperName));
      }
      wrapper = arrayify(wrapper);
      var defaultWrapper = formlyConfig.getWrapper();
      var type = formlyConfig.getType(options.type);
      if (type && type.wrapper) {
        let typeWrappers = arrayify(type.wrapper).map(formlyConfig.getWrapper);
        wrapper = wrapper.concat(typeWrappers);
      }
      if (defaultWrapper) {
        wrapper.push(defaultWrapper);
      }
      if (wrapper.length > 1) {
        return wrapper;
      } else if (wrapper.length === 1) {
        return wrapper[0];
      }
      // otherwise return nothing
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

      // check that only allowed properties are provided
      var allowedProperties = [
        'type', 'template', 'templateUrl', 'key', 'model',
        'expressionProperties', 'data', 'templateOptions',
        'wrapper', 'modelOptions', 'watcher', 'validators',
        'noFormControl'
      ];
      var extraProps = Object.keys(options).filter(prop => allowedProperties.indexOf(prop) === -1);
      if (extraProps.length) {
        throw formlyUsability.getFieldError(
          `You have specified field properties that are not allowed: ${JSON.stringify(extraProps.join(', '))}`,
          options
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

  function arrayify(obj) {
    if (obj && !angular.isArray(obj)) {
      obj = [obj];
    } else if (!obj) {
      obj = [];
    }
    return obj;
  }
};
