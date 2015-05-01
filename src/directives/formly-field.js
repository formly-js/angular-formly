import angular from 'angular-fix';

export default formlyField;

/**
 * @ngdoc directive
 * @name formlyField
 * @restrict AE
 */
// @ngInject
function formlyField($http, $q, $compile, $templateCache, formlyConfig, formlyValidationMessages, formlyApiCheck,
                     formlyUtil, formlyUsability, formlyWarn) {
  return {
    restrict: 'AE',
    transclude: true,
    scope: {
      options: '=',
      model: '=',
      formId: '@',
      index: '=?',
      fields: '=?',
      formState: '=?',
      form: '=?'
    },
    controller: /* @ngInject */ function FormlyFieldController($scope, $timeout, $parse, $controller) {
      var opts = $scope.options;
      var fieldType = opts.type && formlyConfig.getType(opts.type);
      simplifyLife(opts);
      mergeFieldOptionsWithTypeDefaults(opts, fieldType);
      extendOptionsWithDefaults(opts, $scope.index);
      checkApi(opts);
      // set field id to link labels and fields
      $scope.id = formlyUtil.getFieldId($scope.formId, opts, $scope.index);

      // initalization
      runExpressions();
      addModelWatcher($scope, opts);
      addValidationMessages(opts);
      // simplify things
      // create $scope.to so template authors can reference to instead of $scope.options.templateOptions
      $scope.to = $scope.options.templateOptions;
      invokeControllers($scope, opts, fieldType);

      // function definitions
      function runExpressions() {
        // must run on next tick to make sure that the current value is correct.
        $timeout(function runExpressionsOnNextTick() {
          var field = $scope.options;
          var currentValue = valueGetterSetter();
          angular.forEach(field.expressionProperties, function runExpression(expression, prop) {
            var setter = $parse(prop).assign;
            var promise = $q.when(formlyUtil.formlyEval($scope, expression, currentValue));
            promise.then(function setFieldValue(value) {
              setter(field, value);
            });
          });
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

      function simplifyLife(options) {
        // add a few empty objects (if they don't already exist) so you don't have to undefined check everywhere
        formlyUtil.reverseDeepMerge(options, {
          data: {},
          templateOptions: {},
          validation: {}
        });
      }

      function mergeFieldOptionsWithTypeDefaults(options, type) {
        if (type) {
          mergeOptions(options, type.defaultOptions);
        }
        var properOrder = arrayify(options.optionsTypes).reverse(); // so the right things are overridden
        angular.forEach(properOrder, typeName => {
          mergeOptions(options, formlyConfig.getType(typeName, true, options).defaultOptions);
        });
      }

      function mergeOptions(options, extraOptions) {
        if (extraOptions) {
          if (angular.isFunction(extraOptions)) {
            extraOptions = extraOptions(options);
          }
          formlyUtil.reverseDeepMerge(options, extraOptions);
        }
      }

      function extendOptionsWithDefaults(options, index) {
        const key = options.key || index || 0;
        const initialValue = $scope.model && $scope.model[key];
        angular.extend(options, {
          // attach the key in case the formly-field directive is used directly
          key,
          value: valueGetterSetter,
          runExpressions,
          resetModel,
          updateInitialValue,
          initialValue
        });
      }

      // initialization functions
      function addModelWatcher(scope, options) {
        if (options.model) {
          scope.$watch('options.model', runExpressions, true);
        }
      }

      function resetModel() {
        $scope.model[$scope.options.key] = $scope.options.initialValue;
        if ($scope.options.formControl) {
          $scope.options.formControl.$setViewValue($scope.model[$scope.options.key]);
          $scope.options.formControl.$render();
        }
      }

      function updateInitialValue() {
        $scope.options.initialValue = $scope.model[$scope.options.key];
      }

      function addValidationMessages(options) {
        options.validation.messages = options.validation.messages || {};
        angular.forEach(formlyValidationMessages.messages, function createFunctionForMessage(expression, name) {
          if (!options.validation.messages[name]) {
            options.validation.messages[name] = function evaluateMessage(viewValue, modelValue, scope) {
              return formlyUtil.formlyEval(scope, expression, modelValue, viewValue);
            };
          }
        });
      }

      function invokeControllers(scope, options = {}, type = {}) {
        angular.forEach([type.controller, options.controller], controller => {
          if (controller) {
            $controller(controller, {$scope: scope});
          }
        });
      }
    },
    link: function fieldLink(scope, el) {
      var type = scope.options.type && formlyConfig.getType(scope.options.type);
      var args = arguments;
      var thusly = this;
      getFieldTemplate(scope.options)
        .then(runManipulators(formlyConfig.templateManipulators.preWrapper))
        .then(transcludeInWrappers(scope.options))
        .then(runManipulators(formlyConfig.templateManipulators.postWrapper))
        .then(setElementTemplate)
        .then(watchFormControl)
        .catch(error => {
          formlyWarn(
            'there-was-a-problem-setting-the-template-for-this-field',
            'There was a problem setting the template for this field ',
            scope.options,
            error
          );
        });

      function setElementTemplate(templateEl) {
        el.html(asHtml(templateEl));
        $compile(el.contents())(scope);
        if (type && type.link) {
          type.link.apply(thusly, args);
        }
        if (scope.options.link) {
          scope.options.link.apply(thusly, args);
        }
      }

      function watchFormControl() {
        let stopWatchingField = angular.noop;
        let stopWatchingShowError = angular.noop;
        if (scope.options.noFormControl) {
          return;
        }
        const ngModelNode = el[0].querySelector('[ng-model]');
        if (!ngModelNode || !ngModelNode.name) {
          return;
        }
        const nameExpressionRegex = /\{\{(.*?)}}/;
        const nameExpression = nameExpressionRegex.exec(ngModelNode.name);
        if (nameExpression) {
          watchFieldName(nameExpression[1]);
        } else {
          watchFieldExistence(ngModelNode.name);
        }

        function watchFieldName(expression) {
          scope.$watch(expression, function oneFieldNameChange(name) {
            if (name) {
              stopWatchingField();
              watchFieldExistence(name);
            }
          });
        }

        function watchFieldExistence(name) {
          stopWatchingField = scope.$watch(`form["${name}"]`, function formControlChange(formControl) {
            if (formControl) {
              scope.fc = formControl; // shortcut for template authors
              scope.options.formControl = formControl;
              stopWatchingShowError();
              addShowMessagesWatcher();
            }
          });
        }

        function addShowMessagesWatcher() {
          stopWatchingShowError = scope.$watch(function watchShowValidationChange() {
            if (typeof scope.options.validation.show === 'boolean') {
              return scope.fc.$invalid && scope.options.validation.show;
            } else {
              let noTouchedButDirty = (angular.isUndefined(scope.fc.$touched) && scope.fc.$dirty);
              return scope.fc.$invalid && (scope.fc.$touched || noTouchedButDirty);
            }
          }, function onShowValidationChange(show) {
            scope.options.validation.errorExistsAndShouldBeVisible = show;
            scope.showError = show; // shortcut for template authors
          });
        }
      }


      function runManipulators(manipulators) {
        return function runManipulatorsOnTemplate(template) {
          var chain = $q.when(template);
          angular.forEach(manipulators, manipulator => {
            chain = chain.then(template => {
              return $q.when(manipulator(template, scope.options, scope)).then(newTemplate => {
                return angular.isString(newTemplate) ? newTemplate : asHtml(newTemplate);
              });
            });
          });
          return chain;
        };
      }
    }
  };

  function asHtml(el) {
    var wrapper = angular.element('<a></a>');
    return wrapper.append(el).html();
  }

  function getFieldTemplate(options) {
    let type = formlyConfig.getType(options.type, true, options);
    let template = options.template || type && type.template;
    let templateUrl = options.templateUrl || type && type.templateUrl;
    if (!template && !templateUrl) {
      throw formlyUsability.getFieldError(
        'type-type-has-no-template',
        `Type '${options.type}' has not template. On element:`, options
      );
    }

    return getTemplate(template || templateUrl, !template, options);
  }


  function getTemplate(template, isUrl, options) {
    let templatePromise;
    if (angular.isFunction(template)) {
      templatePromise = $q.when(template(options));
    } else {
      templatePromise = $q.when(template);
    }

    if (!isUrl) {
      return templatePromise;
    } else {
      let httpOptions = {cache: $templateCache};
      return templatePromise
        .then((url) => $http.get(url, httpOptions))
        .then((response) => response.data)
        .catch(function handleErrorGettingATemplate(error) {
          formlyWarn(
            'problem-loading-template-for-templateurl',
            'Problem loading template for ' + template,
            error
          );
        });
    }
  }

  function transcludeInWrappers(options) {
    let wrapper = getWrapperOption(options);

    return function transcludeTemplate(template) {
      if (!wrapper.length) {
        return $q.when(template);
      }

      wrapper.forEach((wrapper) => {
        formlyUsability.checkWrapper(wrapper, options);
        wrapper.validateOptions && wrapper.validateOptions(options);
        runApiCheck(wrapper, options);
      });
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
    };
  }

  function doTransclusion(wrapper, template) {
    let superWrapper = angular.element('<a></a>'); // this allows people not have to have a single root in wrappers
    superWrapper.append(wrapper);
    let transcludeEl = superWrapper.find('formly-transclude');
    if (!transcludeEl.length) {
      //try it using our custom find function
      transcludeEl = formlyUtil.findByNodeName(superWrapper, 'formly-transclude');
    }
    transcludeEl.replaceWith(template);
    return superWrapper.html();
  }

  function getWrapperOption(options) {
    let wrapper = options.wrapper;
    // explicit null means no wrapper
    if (wrapper === null) {
      return [];
    }

    // nothing specified means use the default wrapper for the type
    if (!wrapper) {
      // get all wrappers that specify they apply to this type
      wrapper = arrayify(formlyConfig.getWrapperByType(options.type));
    } else {
      wrapper = arrayify(wrapper).map(formlyConfig.getWrapper);
    }

    // get all wrappers for that this type specified that it uses.
    var type = formlyConfig.getType(options.type, true, options);
    if (type && type.wrapper) {
      let typeWrappers = arrayify(type.wrapper).map(formlyConfig.getWrapper);
      wrapper = wrapper.concat(typeWrappers);
    }

    // add the default wrapper last
    var defaultWrapper = formlyConfig.getWrapper();
    if (defaultWrapper) {
      wrapper.push(defaultWrapper);
    }
    return wrapper;
  }

  function checkApi(options) {
    formlyApiCheck.throw(formlyApiCheck.formlyFieldOptions, options, {
      prefix: 'formly-field directive',
      url: 'formly-field-directive-validation-failed'
    });
    // validate with the type
    const type = options.type && formlyConfig.getType(options.type);
    if (type) {
      if (type.validateOptions) {
        type.validateOptions(options);
      }
      runApiCheck(type, options);
    }
  }

  function runApiCheck({apiCheck, apiCheckInstance, apiCheckFunction, apiCheckOptions}, options) {
    if (!apiCheck) {
      return;
    }
    const instance = apiCheckInstance || formlyApiCheck;
    const fn = apiCheckFunction || 'warn';
    const shape = instance.shape(apiCheck);
    instance[fn](shape, options, apiCheckOptions || {
        prefix: `formly-field ${name}`,
        url: formlyApiCheck.config.output.docsBaseUrl + 'formly-field-type-apicheck-failed'
      });
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
